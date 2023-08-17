import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { TrainerModule } from "./trainer/trainer.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { BlogsModule } from "./blogs/blog.module";
import { JwtMiddleware } from "./helpers/middleware/jwt.middleware";
import { JwtModule } from "@nestjs/jwt";
import { WorkoutsModule } from './workouts/workouts.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from "@nestjs/config";
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UsersModule,
    TrainerModule,
    BlogsModule,
    AdminModule,
    WorkoutsModule,
    PaymentModule,
    ChatModule,
    MongooseModule.forRoot("mongodb://localhost:27017/fitness"),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        auth: {
          user: "ffitgo@gmail.com",
          pass: "zgccaqpwsjigjykc",
        },
      },
    }),
    JwtModule.register({
      global: true,
      secret: "jwtSecretKey",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware)
      .exclude(
        { path: '/login', method: RequestMethod.POST },
        { path: '/register', method: RequestMethod.POST },
        { path: '/mail', method: RequestMethod.POST },
        { path: '/verify-otp', method: RequestMethod.POST },
        { path: '/user-details', method: RequestMethod.POST },
        { path: '/admin/login', method: RequestMethod.POST },
        { path: '/trainer/login', method: RequestMethod.POST },
        { path: '/trainer/register', method: RequestMethod.POST },
        { path: '/trainer/details', method: RequestMethod.POST })
      .forRoutes('*')
  }
} 