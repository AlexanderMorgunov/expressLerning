import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";

async function bootstrap() {
  const loggerService = new LoggerService();
  // const userController = new UsersController(loggerService);
  const app = new App(
    loggerService
    // , userController
  );
  await app.init();
}

bootstrap();
