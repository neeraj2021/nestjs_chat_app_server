import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3001;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  await app.listen(PORT);

  console.log(`App is running on port ${PORT}`);
}
bootstrap();
