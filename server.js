const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config/config");
const { AuthenticationHandler } = require("./auth/JWTConfig");
const { CustomRouterFunctions } = require("./framework/CustomRouter");
const { Logger } = require('./framework/Logger');

const userRouter = require('./routes/users');

// Initialize express and set port number
const app = express();
const port = process.env.PORT || config.port;

// Plug in body parser middleware for parsing json requests
app.use(bodyParser.json());

// Handle authentication
app.use(AuthenticationHandler);

// Handle custom router functions
app.use(CustomRouterFunctions);

// Handling GET for the API root
app.get("/", (req, res) => {
    res.send("Welcome to the Zomovie API <br> Visit /api for the API functionality.");
});

// Add routers
app.use("/api/user", userRouter);

// Starting the API
app.listen(port, () => Logger.info(`Zomovie API listening on port ${port}`));

module.exports = app;