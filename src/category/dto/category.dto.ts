import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
@ObjectType()
export class CategoryDto {
  @Field({ nullable: true })
  readonly _id: string;
  @Field({ nullable: true })
  readonly title: string;
  @Field({ nullable: true })
  readonly description: string;
  @Field({ nullable: true })
  readonly createdAt: Date;

  @Field({ nullable: true })
  readonly updatedAt: Date;
}
