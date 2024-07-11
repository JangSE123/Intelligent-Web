const express = require('express');
const axios = require('axios');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 5001;

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const sessionSecret = process.env.SESSION_SECRET;
const redirectURI = 'http://localhost:5001/api/auth/oauth/github/callback'; // Authorization callback URL
const DBHost = process.env.DBHOST;
const DBUser = process.env.USER;
const DBPw = process.env.PASSWORD;
const DB = process.env.DATABASE;

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this domain
  credentials: true // Allow cookies to be sent
}));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use secure: true in production
}));

// Body Parser 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
  host: DBHost,
  user: DBUser,
  password: DBPw,
  database: DB
};

const dbConnection = mysql.createConnection(dbConfig);

// Connect to MySQL
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/login/github', (req, res) => {
  console.log('/login/github called');
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  console.log('Redirecting to GitHub auth URL:', githubAuthURL);
  res.redirect(githubAuthURL);
});

// GitHub OAuth 콜백 처리
app.get('/api/auth/oauth/github/callback', async (req, res) => {
  const code = req.query.code;
  console.log('GitHub code received:', code);

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: clientID,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectURI
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (tokenResponse.data.error) {
      throw new Error(`Error exchanging token: ${tokenResponse.data.error_description}`);
    }

    const accessToken = tokenResponse.data.access_token;
    console.log('Access token received:', accessToken);

    // Store access token in session
    req.session.accessToken = accessToken;

    // Fetch user data from GitHub API
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });

    if (userResponse.status !== 200) {
      throw new Error(`Failed to fetch user data: ${userResponse.status}`);
    }

    const userData = userResponse.data;
    console.log('User data received:', userData);

    // Check if the user already exists in the database
    const selectQuery = `SELECT * FROM User WHERE GitID = ?`;
    dbConnection.query(selectQuery, [userData.login], async (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        throw err;
      }

      if (results.length > 0) {
        // User exists in database, retrieve user data from database
        const existingUser = results[0];
        console.log('Existing user found in database:', existingUser);

        // Store user data in session
        req.session.user = {
          login: existingUser.GitID,
          nickname: existingUser.Nickname,
          AvatarURL: existingUser.AvatarURL
        };

        // Redirect to React app with token as query parameter
        res.redirect(`http://localhost:3000?login=${existingUser.GitID}&avatar_url=${existingUser.AvatarURL}`);
      } else {
        // User does not exist in database, insert new user data into database
        const insertQuery = `INSERT INTO User (GitID, Nickname, AvatarURL) VALUES (?, ?, ?)`;
        dbConnection.query(insertQuery, [userData.login, userData.login, userData.avatar_url], (err, result) => {
          if (err) {
            console.error('Error inserting user data into database:', err);
            throw err;
          }

          console.log('User data inserted into database:', result);

          // Store user data in session
          req.session.user = {
            login: userData.login,
            nickname: userData.login,
            avatar_url: userData.avatar_url
          };

          // Redirect to React app with token as query parameter
          res.redirect(`http://localhost:3000?login=${userData.login}&avatar_url=${userData.avatar_url}`);
        });
      }
    });

  } catch (error) {
    console.error('Error exchanging code for token:', error.message);
    res.status(500).send('Authentication failed');
  }
});

// Update nickname request handler
app.post('/api/user/updateNickname', async (req, res) => {
  const { nickname } = req.body;
  const { login } = req.session.user;

  try {
    const updateQuery = `UPDATE User SET Nickname = ? WHERE GitID = ?`;
    dbConnection.query(updateQuery, [nickname, login], (err, result) => {
      if (err) {
        console.error('Error updating nickname in database:', err);
        throw err;
      }

      console.log('Nickname updated successfully:', result);

      // Update session with new nickname
      req.session.user.nickname = nickname;

      res.status(200).send('Nickname updated successfully');
    });
  } catch (error) {
    console.error('Error updating nickname:', error.message);
    res.status(500).send('Failed to update nickname');
  }
});

app.post('/api/savePlan', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  const { title, start_date, days } = req.body;
  const gitId = req.session.user.login;

  // Insert Plan data
  const insertPlanQuery = `INSERT INTO Plan (GitID, Title, start_date, PlanStatus) VALUES (?, ?, ?, ?)`;
  const insertPlanValues = [gitId, title, start_date, false];


  dbConnection.query(insertPlanQuery, insertPlanValues, (err, planResult) => {
    if (err) {
      console.error('Error inserting plan data:', err);
      return res.status(500).send('Failed to save plan');
    }

    const planNo = planResult.insertId;

    // Insert Activity data
    const insertActivityQuery = `INSERT INTO PlanDetail (PlanNo, ActDay, ActDate, topics, Activities, ActStatus) VALUES ?`;
    const activityValues = days.map(day => [planNo, day.day, day.date, day.topics, day.activities, false]);

    dbConnection.query(insertActivityQuery, [activityValues], (err, activityResult) => {
      if (err) {
        console.error('Error inserting activity data:', err);
        return res.status(500).send('Failed to save activities');
      }

      res.status(200).send('Plan and activities saved successfully');
    });
  });
});


// Handle GitHub API requests for user repos
app.get('/api/github/repos', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const reposResponse = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${req.session.user.accessToken}`
      }
    });

    if (reposResponse.status !== 200) {
      throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
    }

    res.json(reposResponse.data);
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    res.status(500).send('Failed to fetch repositories');
  }
});

// Handle GitHub API requests for repo commits
app.get('/api/github/repos/:owner/:repo/commits', async (req, res) => {
  const { owner, repo } = req.params;

  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const commitsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        Authorization: `token ${req.session.user.accessToken}`
      },
      params: {
        per_page: 5
      }
    });

    if (commitsResponse.status !== 200) {
      throw new Error(`Failed to fetch commits: ${commitsResponse.status}`);
    }

    res.json(commitsResponse.data);
  } catch (error) {
    console.error('Error fetching commits:', error.message);
    res.status(500).send('Failed to fetch commits');
  }
});

// Handle GitHub API requests for specific commit
app.get('/api/github/repos/:owner/:repo/commits/:sha', async (req, res) => {
  const { owner, repo, sha } = req.params;

  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const commitResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits/${sha}`, {
      headers: {
        Authorization: `token ${req.session.user.accessToken}`
      }
    });

    if (commitResponse.status !== 200) {
      throw new Error(`Failed to fetch commit: ${commitResponse.status}`);
    }

    res.json(commitResponse.data);
  } catch (error) {
    console.error('Error fetching commit:', error.message);
    res.status(500).send('Failed to fetch commit');
  }
});
// login과 date 기반으로 작업을 가져오는 엔드포인트 추가
app.get('/api/tasks', (req, res) => {
  const { login, date } = req.query;

  console.log('Received request for tasks with login:', login, 'and date:', date); // 요청 로그 추가

  const query = `
    SELECT * 
FROM Plan p 
JOIN PlanDetail pd ON p.PlanNo = pd.PlanNo 
WHERE p.GitID = ? And pd.ActDate = ? ;
  `;
  
  dbConnection.query(query, [login, date], (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).send('Failed to fetch tasks');
    }

    console.log('Query results:', results); // 쿼리 결과 로그 추가
    
    const tasks = results.map(task => ({
      id: task.id,
      name: `${task.Title}: ${task.Topics} - ${task.Activities}`,
      status: task.ActStatus === 1
    }));
    
    res.json(tasks);
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

