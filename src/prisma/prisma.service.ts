import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    console.log('PrismaService initialized');
  }

  async onModuleInit() {
    try {
      console.log('Connecting to database...');
      await this.$connect();
      console.log('✅ Database connection success');
    } catch (error) {
      console.error('❌ Database connection failed', error);
      // Rethrow to prevent application from starting with bad connection
      throw error;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    console.log('Setting up shutdown hooks...');

    this.$on('beforeExit' as Parameters<PrismaClient['$on']>[0], async () => {
      console.log('Database connection closing...');
      await app.close();
      console.log('Application successfully shut down');
    });

    // Add listener for process termination signals
    process.on('SIGINT', async () => {
      console.log('\nReceived SIGINT (Ctrl+C)');
      await app.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\nReceived SIGTERM');
      await app.close();
      process.exit(0);
    });
  }
}
