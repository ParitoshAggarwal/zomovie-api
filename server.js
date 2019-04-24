const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config/config");
const { AuthenticationHandler } = require("./auth/JWTConfig");
const { CustomRouterFunctions } = require("./framework/CustomRouter");
const { Logger } = require('./framework/Logger');

const userRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const showsRouter = require('./routes/shows');
const bookingRouter = require('./routes/booking');
const profileRouter = require('./routes/profile');

// Initialize express and set port number
const app = express();
const port = process.env.PORT || config.port;

// Plug in body parser middleware for parsing json requests
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())
app.options('*', cors())

// // CORS Support
// app.use((req, res, next) => {
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-key");

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// Handle authentication
app.use(AuthenticationHandler);

// Handle custom router functions
app.use(CustomRouterFunctions);

// Handling GET for the API root
app.get("/", (req, res) => {
    res.send("Welcome to the Zomovie API <br> Visit /api for the API functionality.");
});

// Add routers
app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/shows", showsRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/profile", profileRouter);

// Starting the API
app.listen(port, () => Logger.info(`Zomovie API listening on port ${port}`));

module.exports = app;