import { Module,MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';


@Module({
  imports:[ UsersModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer 
    .apply(LoggerMiddleware)
    .forRoutes({ path: 'users', method: RequestMethod.GET});
  }


}




