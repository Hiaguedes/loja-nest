import { Module } from '@nestjs/common';
import { UsuarioModule } from './User/user.module';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
