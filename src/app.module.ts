import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/todo.entity';
import { AuthMiddleware } from './auth/auth.middleware';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { Cv } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    CommonModule,
    PremierModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres123',
      database: 'tpnest',
      entities: [TodoEntity, Cv, Skill, User],
      synchronize: true,
    }),
    CvModule,
    SkillModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: 'todo*', version: '2' },
        { method: RequestMethod.PUT, path: 'todo*', version: '2' },
        { method: RequestMethod.DELETE, path: 'todo*', version: '2' },
        { method: RequestMethod.PATCH, path: 'todo*', version: '2' },
      );
  }
}
