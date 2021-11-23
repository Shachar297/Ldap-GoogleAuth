/**
 * This is the main module of the application.
 * This module will listen for in-coming requests and will process them
 */

const
  // ip = require("ip"),
  express = require("express"),
  cors = require("cors"),
  server = express(),

  // The LDAp route which handle the requests
  ldapRouter = require("./routes/ldap"),
  authenticatorRouter = require("./routes/authenticator"),
  // The default port for the demo server
  port = process.env.PORT || 3333;

// Server static content
server.use(express.static('public'));

// Allow CORS requests
server.use(cors({ origin: "*" }));
server.use(express.json());

// Process the requests throw the LDAP Router
server.use("/ldap", ldapRouter);
server.use("/auth", authenticatorRouter);
// Start the server
server.listen(port, () => console.log("Server is running at port " + port));