import express, { Express } from "express";
import { userRouter } from "./users/users";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userController: UsersController;
  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = new UsersController(this.logger);
  }

  useRoutes() {
    // this.app.use("/users", userRouter);
    this.app.use("/users", this.userController.router);
  }
  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }
}
