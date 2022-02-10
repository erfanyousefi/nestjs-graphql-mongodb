import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './inputs/category.input';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}
  @Query(() => [CategoryDto])
  async categories() {
    return await this.categoryService.categories();
  }

  @Query(() => CategoryDto)
  async findCategory(@Args('input') input: FindCategoryInput) {
    return await this.categoryService.findCategory(input);
  }

  @Mutation(() => CategoryDto)
  async createCategory(@Args('input') input: CategoryInput) {
    return await this.categoryService.createCategory(input);
  }

  @Mutation(() => CategoryDto)
  async updateCategory(@Args('input') input: UpdateCategoryInput) {
    return await this.categoryService.updateCategory(input);
  }

  @Mutation(() => CategoryDto)
  async deleteCategory(@Args('input') input: FindCategoryInput) {
    return this.categoryService.deleteCategory(input);
  }
}
