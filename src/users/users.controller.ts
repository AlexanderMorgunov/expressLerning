import { BaseController } from "../common/base.controller";
import { IControllerRoute } from "../common/route.interface";
import { LoggerService } from "../logger/logger.service";
import { userRouter } from "./users";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    console.log(userRouter);
    this.bindRoutes(userRouter.stack.Layer);
  }
}
