import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { BookModule } from './book/book.module';

@Module({
  controllers: [CoreController],
  providers: [CoreService],
  imports: [BookModule]
})
export class CoreModule {}
