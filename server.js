const express = require("express");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = 5001;

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const sessionSecret = process.env.SESSION_SECRET;
const redirectURI = "http://localhost:5001/api/auth/oauth/github/callback"; // Authorization callback URL
const DBHost = process.env.DBHOST;
const DBUser = process.env.USER;
const DBPw = process.env.PASSWORD;
const DB = process.env.DATABASE;
const GPTAPI = process.env.GPTAPI;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this domain
    credentials: true, // Allow cookies to be sent
  })
);

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use secure: true in production
  })
);

// Body Parser 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
  host: DBHost,
  user: DBUser,
  password: DBPw,
  database: DB,
};

const dbConnection = mysql.createConnection(dbConfig);

// Connect to MySQL
dbConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

app.get("/login/github", (req, res) => {
  console.log("/login/github called");
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  console.log("Redirecting to GitHub auth URL:", githubAuthURL);
  res.redirect(githubAuthURL);
});

// GitHub OAuth 콜백 처리
app.get("/api/auth/oauth/github/callback", async (req, res) => {
  const code = req.query.code;
  console.log("GitHub code received:", code);

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectURI,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (tokenResponse.data.error) {
      throw new Error(
        `Error exchanging token: ${tokenResponse.data.error_description}`
      );
    }

    const accessToken = tokenResponse.data.access_token;
    console.log("Access token received:", accessToken);

    req.session.accessToken = accessToken;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    if (userResponse.status !== 200) {
      throw new Error(`Failed to fetch user data: ${userResponse.status}`);
    }

    const userData = userResponse.data;
    console.log("User data received:", userData);

    const selectQuery = `SELECT * FROM User WHERE GitID = ?`;
    dbConnection.query(selectQuery, [userData.login], async (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        throw err;
      }

      if (results.length > 0) {
        const existingUser = results[0];
        console.log("Existing user found in database:", existingUser);

        req.session.user = {
          login: existingUser.GitID,
          nickname: existingUser.Nickname,
          AvatarURL: existingUser.AvatarURL,
        };

        // res.redirect(`http://localhost:3000?login=${existingUser.GitID}&avatar_url=${existingUser.AvatarURL}`);
        res.redirect(`http://localhost:3000`);
      } else {
        const insertQuery = `INSERT INTO User (GitID, Nickname, AvatarURL) VALUES (?, ?, ?)`;
        dbConnection.query(
          insertQuery,
          [userData.login, userData.login, userData.avatar_url],
          (err, result) => {
            if (err) {
              console.error("Error inserting user data into database:", err);
              throw err;
            }

            console.log("User data inserted into database:", result);

            req.session.user = {
              login: userData.login,
              nickname: userData.login,
              avatar_url: userData.avatar_url,
            };

            // res.redirect(`http://localhost:3000?login=${userData.login}&avatar_url=${userData.avatar_url}`);
            res.redirect(`http://localhost:3000`);
          }
        );
      }
    });
  } catch (error) {
    console.error("Error exchanging code for token:", error.message);
    res.status(500).send("Authentication failed");
  }
});

// Update nickname request handler
app.post("/api/user/updateNickname", async (req, res) => {
  const { nickname } = req.body;
  const { login } = req.session.user;

  try {
    const updateQuery = `UPDATE User SET Nickname = ? WHERE GitID = ?`;
    dbConnection.query(updateQuery, [nickname, login], (err, result) => {
      if (err) {
        console.error("Error updating nickname in database:", err);
        throw err;
      }

      console.log("Nickname updated successfully:", result);

      // Update session with new nickname
      req.session.user.nickname = nickname;

      res.status(200).send("Nickname updated successfully");
    });
  } catch (error) {
    console.error("Error updating nickname:", error.message);
    res.status(500).send("Failed to update nickname");
  }
});

// Endpoint to get session user data
app.get("/api/session-user", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send("No user session found");
  }
});

// Endpoint for logout
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.send("Logout successful");
  });
});

// Update nickname request handler
app.post("/api/user/updateNickname", async (req, res) => {
  const { nickname } = req.body;
  const { login } = req.session.user;

  try {
    const updateQuery = `UPDATE User SET Nickname = ? WHERE GitID = ?`;
    dbConnection.query(updateQuery, [nickname, login], (err, result) => {
      if (err) {
        console.error("Error updating nickname in database:", err);
        throw err;
      }

      console.log("Nickname updated successfully:", result);

      // Update session with new nickname
      req.session.user.nickname = nickname;

      res.status(200).send("Nickname updated successfully");
    });
  } catch (error) {
    console.error("Error updating nickname:", error.message);
    res.status(500).send("Failed to update nickname");
  }
});

app.post("/api/savePlan", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }
  const { title, start_date, days } = req.body;
  const gitId = req.session.user.login;

  // Insert Plan data
  const insertPlanQuery = `INSERT INTO Plan (GitID, Title, start_date, PlanStatus) VALUES (?, ?, ?, ?)`;
  const insertPlanValues = [gitId, title, start_date, false];

  dbConnection.query(insertPlanQuery, insertPlanValues, (err, planResult) => {
    if (err) {
      console.error("Error inserting plan data:", err);
      return res.status(500).send("Failed to save plan");
    }

    const planNo = planResult.insertId;

    // Insert Activity data
    const insertActivityQuery = `INSERT INTO PlanDetail (PlanNo, ActDay, ActDate, topics, Activities, ActStatus) VALUES ?`;
    const activityValues = days.map((day) => [
      planNo,
      day.day,
      day.date,
      day.topics,
      day.activities,
      false,
    ]);

    dbConnection.query(
      insertActivityQuery,
      [activityValues],
      (err, activityResult) => {
        if (err) {
          console.error("Error inserting activity data:", err);
          return res.status(500).send("Failed to save activities");
        }

        res.status(200).send("Plan and activities saved successfully");
      }
    );
  });
});

// Handle GitHub API requests for user repos
app.get("/api/github/repos", async (req, res) => {
  if (!req.session.user || !req.session.accessToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    console.log("Fetching repositories for user:", req.session.user.login);
    console.log("Access Token:", req.session.accessToken);

    const reposResponse = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${req.session.accessToken}`,
      },
    });

    if (reposResponse.status !== 200) {
      throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
    }

    res.json(reposResponse.data);
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res.status(500).send("Failed to fetch repositories");
  }
});

// Handle GitHub API requests for repo commits
app.get("/api/github/repos/:owner/:repo/commits", async (req, res) => {
  const { owner, repo } = req.params;

  if (!req.session.user || !req.session.accessToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    console.log(`Fetching commits for repo: ${owner}/${repo}`);
    console.log("Access Token:", req.session.accessToken);

    const commitsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        headers: {
          Authorization: `token ${req.session.accessToken}`,
        },
      }
    );

    console.log("Rate Limit:", commitsResponse.headers["x-ratelimit-limit"]);
    console.log(
      "Rate Limit Remaining:",
      commitsResponse.headers["x-ratelimit-remaining"]
    );

    if (commitsResponse.status !== 200) {
      throw new Error(`Failed to fetch commits: ${commitsResponse.status}`);
    }

    res.json(commitsResponse.data);
  } catch (error) {
    console.error("Error fetching commits:", error.message);
    res.status(500).send("Failed to fetch commits");
  }
});

// Handle GitHub API requests for specific commit
app.get("/api/github/repos/:owner/:repo/commits/:sha", async (req, res) => {
  const { owner, repo, sha } = req.params;

  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const commitResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
      {
        headers: {
          Authorization: `token ${req.session.accessToken}`,
        },
      }
    );

    if (commitResponse.status !== 200) {
      throw new Error(`Failed to fetch commit: ${commitResponse.status}`);
    }

    res.json(commitResponse.data);
  } catch (error) {
    console.error("Error fetching commit:", error.message);
    res.status(500).send("Failed to fetch commit");
  }
});

app.get('/api/config', (req, res) => {
  res.json({ gptApiKey: GPTAPI });
});

/* GPT API */
app.post('/api/summarize', async (req, res) => {
  const { commitDetails } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo-16k",
      messages: [
        { 
          role: "system", 
          content: `너는 웹에서 커밋요약 챗봇이야. 제공받은 커밋을 처음 본 협업자도 너가 한 설명을 보고 바로 알 수 있도록 정확하게 알려줘야돼. 내용을 채울 형식은 
                    다음과 같고 넌 여기서 ()안을 적절한 답으로 바꿔야해.`+`
                    <p class=GptCommitMsg> <b>커밋내용</b> : (커밋내용) </p> 
                    <div class=GptCommitAuthor> <b>작성자</b> : (커밋작성자) </div> 
                    <div class=GptCommitChangeContainer> <b>변동 사항</b> :
                      <div>
                        <ul class=GptFile>(파일명)
                          <li class=GptFixList>(수정 내용 자세히 설명 : 줄마다 li 추가로 사용)</li>
                        </ul>
                      </div>
                    </div>

                    <div> <b>총 요약</b> :  (변동 사항 3줄 요약) </div>
                    `+`너가 요약할 때는 절대로 "몇줄이 추가되고 삭제되었습니다." 라는 말을 쓰면 안되고 제대로 변동된 내용을 요약해야해`
                    
        },
        {
          role: "user", 
          content: `${commitDetails}를 확인하고 커밋 내용을 자세히 요약해봐`
          // `너는 ${commitDetails} 이 커밋 디테일을  가지고 커밋 메세지, 작업 내용 or 변경 내용, 중요 참고 코드, 간단한 기능 요약 이렇게 타이틀을 잡고 적어줘. 각 타이틀에 들어가는 내용은 div태그로 구분감을 줘야해. 참고 코드에는 태그를 code태그로 잡아야해.`
          
          // `내가 보기 좋게 <div>,<code>,<ul>,<li> 를 적극 활용해야해. ${commitDetails}의 파일 내부 코드를 검토하고 수정된 내용이 전과 비교해서 어떻게 작동하도록 변경되었는지 2000자 내외로 설명하고 마지막부분엔 커밋에서 중요한 내용을 3줄분량으로 요약. 한문장 끝날 때 마다 줄바꿈 하고 2000자와 3줄 사이의 줄바꿈 2번 html로 반환`

          //  `너는 커밋 내용을 전달받아서 커밋 내용을 요약해서한글로 html로 반환하는 역할이야. 마지막엔 커밋에서 중요한 내용을 3줄 요약해야해. 다음은 너가 갖춰서 제공할 틀이야 {}는 너가 적절한 값으로 대체해야해.
          //  <p><strong>{작성자}</strong> 사용자가 <em>{언제}</em> <strong>{무슨 파일}</strong>들을 <em>"{메세지}"</em>와 함께 커밋했습니다.</p> <p><b>요약</b>: {커밋 세줄 요약}</p>${commitDetails}`
        }
      ]
    }, {
      headers: {
        'Authorization': `${GPTAPI}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ summary: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error summarizing commit details:', error);
    res.status(500).send('Failed to summarize commit details');
  }
});





// login과 date 기반으로 작업을 가져오는 엔드포인트 추가
app.get("/api/tasks", (req, res) => {
  const { login, date } = req.query;

  console.log(
    "Received request for tasks with login:",
    login,
    "and date:",
    date
  ); // 요청 로그 추가

  const query = `
    SELECT * 
FROM Plan p 
JOIN PlanDetail pd ON p.PlanNo = pd.PlanNo 
WHERE p.GitID = ? And pd.ActDate = ? ;
  `;

  dbConnection.query(query, [login, date], (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      return res.status(500).send("Failed to fetch tasks");
    }

    console.log("Query results:", results); // 쿼리 결과 로그 추가

    const tasks = results.map((task) => ({
      id: task.id,
      name: `${task.Title}: ${task.Topics} - ${task.Activities}`,
      status: task.ActStatus === 1,
    }));

    res.json(tasks);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
