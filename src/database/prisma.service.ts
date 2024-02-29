import { PrismaClient, UserModal } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Соединение с базой данных установлено');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(
					`[PrismaService] Ошика при установке соединения с базой данных: ${e.message}`,
				);
			} else {
				this.logger.error('[PrismaService] Не удалось установить соединение с базой данных');
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
		this.logger.log('[PrismaService] Соединение с базой данных закрыто');
	}
}
