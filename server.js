require('dotenv').config();
const express = require('express');
const axios = require('axios');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql2');

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
  origin: 'http://localhost:3000', // 허용할 도메인
  credentials: true // 쿠키를 전달하려면 true로 설정
}));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // In production, use secure: true
}));

const dbConfig = {
  host: DBHost,
  user: DBUser,
  password: DBPw,
  database: DB
};

const dbConnection = mysql.createConnection(dbConfig);

// MySQL 연결
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
  console.log('/api/auth/oauth/github/callback called');
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

    console.log('Token response:', tokenResponse.data);

    if (tokenResponse.data.error) {
      throw new Error(`Error exchanging token: ${tokenResponse.data.error_description}`);
    }

    const accessToken = tokenResponse.data.access_token;
    console.log('Access token received:', accessToken);

    // Store access token in session
    req.session.accessToken = accessToken;

    // Use access token to fetch user data from GitHub API
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
    const selectValues = [userData.login];

    dbConnection.query(selectQuery, selectValues, async (err, results) => {
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
          avatar_url: existingUser.AvatarURL, // Assuming you have this column in your User table
          nickname: existingUser.Nickname // Include existing nickname
          // Add more fields as needed
        };

        // Redirect to React app with token as query parameter
        res.redirect(`http://localhost:3000?login=${userData.GitID}&avatar_url=${userData.avatar_url}`);
      } else {
        // User does not exist in database, insert new user data into database
        const insertQuery = `INSERT INTO User (GitID, Nickname) VALUES (?, ?)`;
        const insertValues = [userData.login, userData.login]; // Use GitHub login as default Nickname

        dbConnection.query(insertQuery, insertValues, (err, result) => {
          if (err) {
            console.error('Error inserting user data into database:', err);
            throw err;
          }

          console.log('User data inserted into database:', result);

          // Store user data in session
          req.session.user = {
            login: userData.login,
            avatar_url: userData.avatar_url,
            nickname: userData.login // Set default nickname to GitHub login
            // Add more fields as needed
          };

          // Redirect to React app with token as query parameter
          res.redirect(`http://localhost:3000?login=${userData.login}&avatar_url=${userData.avatar_url}`);
        });
      }
    });

  } catch (error) {
    console.error('Error authenticating with GitHub:', error.message);
    console.error(error);
    res.status(500).send('Authentication failed');
  }
});

// 페이지에서 Nickname 업데이트 요청 처리
app.post('/api/user/updateNickname', async (req, res) => {
  const { nickname } = req.body;
  const { login } = req.session.user;

  try {
    const updateQuery = `UPDATE User SET Nickname = ? WHERE GitID = ?`;
    const updateValues = [nickname, login];

    dbConnection.query(updateQuery, updateValues, (err, result) => {
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


app.get('/api/github/repos', async (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const reposResponse = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${req.session.accessToken}`
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

app.get('/api/github/repos/:owner/:repo/commits', async (req, res) => {
  const { owner, repo } = req.params;

  console.log(`Fetching commits for ${owner}/${repo}`);

  if (!req.session.accessToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const commitsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        Authorization: `token ${req.session.accessToken}`
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

app.get('/api/github/repos/:owner/:repo/commits/:sha', async (req, res) => {
  const { owner, repo, sha } = req.params;

  console.log(`Fetching commit ${sha} for ${owner}/${repo}`);

  if (!req.session.accessToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const commitResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits/${sha}`, {
      headers: {
        Authorization: `token ${req.session.accessToken}`
      }
    });

    if (commitResponse.status !== 200) {
      throw new Error(`Failed to fetch commit details: ${commitResponse.status}`);
    }

    res.json(commitResponse.data);
  } catch (error) {
    console.error('Error fetching commit details:', error.message);
    res.status(500).send('Failed to fetch commit details');
  }
});

app.get('/logout', (req, res) => {
  console.log('Logging out user:', req.session.user);

  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy session:', err);
      return res.status(500).send('Failed to log out');
    }

    // Redirect to home page or GitHub logout page
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

