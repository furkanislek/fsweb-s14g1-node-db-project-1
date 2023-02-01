const express = require("express");
const AR = require("./accounts/accounts-router");


const server = express();


server.use(express.json());
server.use("/api/accounts" , AR);


module.exports = server;
