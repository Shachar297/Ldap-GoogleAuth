const express = require("express");
const cors = require("cors");

const userController = require("./controllers/user-controller");

const server = express();

const port = process.env.PORT || 3333;

server.use(express.static('public'));

server.use(cors({ origin: "*" }));
server.use(express.json());

server.use("/users", userController);

server.listen(port, () => console.log("Server is running at port " + port));