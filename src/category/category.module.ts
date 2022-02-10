import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryResolver } from './category.resolver';
import { Category, CategorySchema } from './category.schema';
import { CategoryService } from './category.service';

@Module({
  controllers: [],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  exports: [],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
