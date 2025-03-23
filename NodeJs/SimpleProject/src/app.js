import express from "express";
import routes from "./routes";

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

export default new App().server;
