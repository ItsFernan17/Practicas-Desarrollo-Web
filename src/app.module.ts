import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sierraF017',
      database: 'pruebas_nestjs',
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false
    }) 
    ,ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
