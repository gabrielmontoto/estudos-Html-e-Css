const express = require("express");
const routes = require("./routes");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.mountRoutes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  mountRoutes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
