// ! requiring packages
const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')

// ! initializing packages
const app = express();
require('dotenv').config();

// ! database connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('db Connected');
	})
	.catch((error) => {
		console.log(error);
	});

// ! session setup
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 2
			// secure: true
		}
	})
);

// Cors
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get('/', function(req, res) {
	res.send('server is working');
});


// ! google auth setup
const { passportInit } = require('./config/passport');
passportInit(app);

app.get("/getuser", (req, res) => { //sending current user to client
	// console.log(req.user);
	res.send(req.user);
})

app.get("/auth/logout", (req, res, next) => {
	if (req.user) {
	  req.logout(function(err) {
		if (err) { return next(err); }
		res.send("done");
	  });
	}
})


// ! server configuration
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));


// ! requiring routes
const oAuthRoutes = require('./routes/oAuth'); 
app.use(oAuthRoutes); 

// ! listening to port
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`server started on port ${port}`);
});