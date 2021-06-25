const express = require("express")
const app = express()

require("dotenv").config()

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: 'https://dev-3zfsci9p.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  console.log(req.oidc.user);
  if(req.oidc.isAuthenticated()){
    res.send(`Logged In :  ${req.oidc.user.email}`);
  }
  else{
      res.send("Logged out");
  }
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});



const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server started at ${port}`)
})