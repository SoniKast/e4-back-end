import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, 
    {
      transport: Transport.GRPC,
      options: {
        package: 'salarie',
        protoPath: join(__dirname, 'proto/salarie.proto'),
        url: '0.0.0.0:50051',
      },
    }
  );
  await app.listen();
  console.log('Service SALARIE gRPC démarré sur le port 50051');
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
