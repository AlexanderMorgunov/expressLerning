import { UserModal } from '@prisma/client';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, name, password }: User): Promise<UserModal> {
		return this.prismaService.client.userModal.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async find(email: string): Promise<UserModal | null> {
		return this.prismaService.client.userModal.findFirst({
			where: {
				email,
			},
		});
	}
}
