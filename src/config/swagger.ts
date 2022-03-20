import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Arrenda')
  .setDescription('')
  .setVersion('1.0')
  .build();
