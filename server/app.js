const express = require("express");
const cors = require("cors");

const userController = require("./controllers/user-controller");
const ldapController = require("./controllers/ldap-contoller");

const server = express();

const port = process.env.PORT || 3333;

server.use(express.static('public'));

server.use(cors({ origin: "*" }));
server.use(express.json());

server.use("/users", userController);
server.use("/ldap", ldapController);
server.listen(port, () => console.log("Server is running at port " + port));