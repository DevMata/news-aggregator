import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ValidateSearchMiddleware } from './middleware/validate-search.middleware';
import { ValidateSourceParamMiddleware } from './middleware/validate-source-param.middleware';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), NewsModule, LoginModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ValidateSearchMiddleware, ValidateSourceParamMiddleware).forRoutes('news');
  }
}
