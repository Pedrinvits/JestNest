import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PostModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: 
  [
    UsuarioModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    TypeOrmModule.forRootAsync({
      useClass : PostgresConfigService,
      inject : [PostgresConfigService]
    })
  ],
})
export class AppModule {}
