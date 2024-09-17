import * as TypeGraphQL from 'type-graphql'

@TypeGraphQL.ArgsType()
export class LoginArgs {
  @TypeGraphQL.Field(() => String, {
    nullable: false,
  })
  email!: string

  @TypeGraphQL.Field(() => String, {
    nullable: false,
  })
  password!: string
}

@TypeGraphQL.ArgsType()
export class SendEmailArgs {
  @TypeGraphQL.Field(() => String, {
    nullable: false,
  })
  email!: string

}
