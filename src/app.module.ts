import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { InstancesModule } from './instances/instances.module';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instance } from './instances/entities/instance.entity';
import { Author } from './authors/entities/author.entity';

@Module({
  imports: [
    InstancesModule,
    AuthorsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Instance, Author],
      synchronize: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
