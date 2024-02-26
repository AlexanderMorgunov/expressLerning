import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { Container, ContainerModule, interfaces } from "inversify";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import "reflect-metadata";
import { IUsersController } from "./users/users.controller.interface";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUsersController>(TYPES.UserController).to(UsersController);
  bind<App>(TYPES.Application).to(App);
});

// async function bootstrap() {
// const loggerService = new LoggerService();
// const usersController = new UsersController(loggerService);
// const exceptionFilter = new ExceptionFilter(loggerService);
// const app = new App(loggerService, usersController, exceptionFilter);
function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

// }
export const { app, appContainer } = bootstrap();

// bootstrap();
