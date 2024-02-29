import { injectable } from 'inversify';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUsersService } from './users.service.interface';

@injectable()
export class UsersService implements IUsersService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		// проверка, что он сущестует
		// Если есть то возвращаем null, если нет то создаем нового пользователя
		await newUser.setPassword(password);
		// return newUser;
		return null;
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
