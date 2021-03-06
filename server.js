const express = require("express");
//IB for sessions
const bodyParser = require('body-parser')
const session = require('express-session')
var path = require("path");
const dbConnection = require('./models')
const concerts=require('./models/concert')
const MongoStore = require('connect-mongo')(session)
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const user = require('./routes/api/user')
//IB adding for passport
const passport = require('passport');

// MIDDLEWARE
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions --> creates an empty session object, as req.session
// saves the session object to the database
app.use(
	session({
		secret: 'struggling-ninja', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// IB to pass the passport middleware
app.use(passport.initialize());
app.use(passport.session()) // calls the deserializeUser

// Routes
app.use('/user', user)

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
