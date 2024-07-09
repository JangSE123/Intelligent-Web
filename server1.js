const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const clientID = 'Ov23lirCw6r5iywds64U';
const clientSecret = 'bca6dd3d8b8088c515d635e131ed347795109dac';
const redirectURI = 'http://localhost:3000/callback'; // Authorization callback URL

app.get('/login/github', (req, res) => {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  res.redirect(githubAuthURL);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;

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

    const accessToken = tokenResponse.data.access_token;

    // Use access token to fetch user data from GitHub API
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });

    const userData = userResponse.data;

    // Redirect to React app with token and user data as query parameters
    res.redirect(`http://localhost:3001?access_token=${accessToken}&login=${userData.login}&avatar_url=${userData.avatar_url}`);
  } catch (error) {
    console.error('Error authenticating with GitHub:', error);
    res.status(500).send('Authentication failed');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
