import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  app.use(cookieParser());

  app.enableCors({
    origin: ['https://cv-design-frontend.vercel.app', 'http://localhost:3000'], // Add both hosted frontend and local frontend
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('App is listening to', process.env.PORT);
  });
}
bootstrap();
