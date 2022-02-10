import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CategoryInput{
    @Field()
    readonly title : string;
    @Field()
    readonly description : string;
}

@InputType()
export class UpdateCategoryInput{
    @Field()
    readonly _id : string
    @Field()
    readonly title : string;
    @Field()
    readonly description : string;
}

@InputType()
export class FindCategoryInput{
    @Field()
    readonly _id : string;
}