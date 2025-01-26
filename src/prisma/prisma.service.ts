import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Use explicit type casting
    this.$on('beforeExit' as Parameters<PrismaClient['$on']>[0], async () => {
      await app.close();
    });
  }
}
