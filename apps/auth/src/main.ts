import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH } from '@app/common';

async function bootstrap() {
  // const app = await NestFactory.create(AuthModule);
  // await app.listen(process.env.port ?? 3002);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '127.0.0.1:5000',
        protoPath: join(__dirname, '../auth.proto'),
        package: AUTH
      }
    }
  )

  await app.listen();
}
bootstrap();
