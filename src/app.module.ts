import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, CoreModule],
})
export class AppModule {}
