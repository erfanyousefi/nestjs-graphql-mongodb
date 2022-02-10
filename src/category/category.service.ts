import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from './category.schema';
import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './inputs/category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async categories(): Promise<Category[]> {
    return await this.categoryModel.find({});
  }
  async findCategory(input: FindCategoryInput): Promise<Category> {
    const category = await this.categoryModel.findById(input._id);
    if (!category) throw new HttpException('not found Category', 404);
    return category;
  }
  async createCategory(categoryInput: CategoryInput): Promise<Category> {
    const category = this.categoryModel.create({
      ...categoryInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return category;
  }
  async updateCategory(update: UpdateCategoryInput): Promise<Category> {
    const input: FindCategoryInput = { _id: update._id };
    await this.findCategory(input);
    await this.categoryModel.updateOne(
      { _id: update._id },
      {
        $set: { ...update, updatedAt: new Date() },
      },
    );
    return await this.findCategory(input);
  }

  async deleteCategory(input: FindCategoryInput): Promise<Category> {
    const category = await this.findCategory(input);
    await this.categoryModel.deleteOne({ _id: input._id });
    return category;
  }
}
