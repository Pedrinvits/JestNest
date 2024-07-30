import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PostModule } from './posts/posts.module';

@Module({
  imports: [UsuarioModule,PostModule],
})
export class AppModule {}
