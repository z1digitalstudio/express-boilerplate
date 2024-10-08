import { AuthCheckerInterface, ResolverData } from 'type-graphql'

import { ApolloContext } from '@core/handlers/types.js'

export class CustomAuthChecker implements AuthCheckerInterface<ApolloContext> {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  check({ context }: ResolverData<ApolloContext>, roles: string[]) {
    const userInfo = context.getUserInfo()
    if (!userInfo) {
      return false
    }
    // Add other checks here, e.g. check if user is admin
    // customize the roles argument to match your needs
    return true
  }
}
