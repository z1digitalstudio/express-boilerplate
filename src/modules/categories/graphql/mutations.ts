import { ApolloContext } from '@core/handlers/types'
import { Category } from '@generated/type-graphql'
import { CreateCategoryArgs, UpdateCategoryArgs } from './inputs'
import * as TypeGraphQL from 'type-graphql'
import type { GraphQLResolveInfo } from 'graphql'

@TypeGraphQL.Resolver(() => Category)
export class CategoryMutations {
  @TypeGraphQL.Mutation(() => Category, {
    nullable: true,
  })
  async createCategory(
    @TypeGraphQL.Ctx() ctx: ApolloContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateCategoryArgs,
  ): Promise<Category | null> {
    return ctx.prisma.category.create({
      data: {
        ...args.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }

  @TypeGraphQL.Mutation(() => Category, {
    nullable: true,
  })
  async updateCategory(
    @TypeGraphQL.Ctx() ctx: ApolloContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateCategoryArgs,
  ): Promise<Category | null> {
    return ctx.prisma.category.update({
      data: {
        ...args.data,
        updatedAt: new Date(),
      },
      where: {
        id: args.categoryId,
      },
    })
  }
}
