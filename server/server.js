/**
 * This is the main module of the application.
 * This module will listen for in-comming requests and will process them
 */

const
  // ip = require("ip"),
  cors = require("cors"),
  express = require("express"),
  server = express(),
  userController = require("./controllers/user-controller"),
  ldapController = require("./controllers/ldap-controller"),
  port = process.env.PORT || 3333;

server.use(express.static('public'));

// Allow CORS requests
server.use(cors({ origin: "*" }));
server.use(express.json());

// Routes
server.use("/users", userController);
server.use("/ldap", ldapController);

// Start the server
server.listen(port, () => console.log("Server is running at port " + port));