import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UsersService) private userService: IUsersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		// next(new HTTPError(401, "Ошибка авторизации", "login"));
		console.log(req.body);
		this.ok(res, 'login');
	}

	async register(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(req.body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует', 'register'));
		}
		// this.ok(res, result);
		this.ok(res, {
			email: result.email,
			name: result.name,
			id: result.id,
		});
	}
}
