import 'dotenv/config'
// 👆 this must be the first import
import 'reflect-metadata'
import { addAdminJsToFastify } from '@core/handlers/adminjs.js'
import { getApolloHandler } from '@core/handlers/apollo.js'
import Fastify from 'fastify'
import jwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'

const fastify = Fastify({
  logger: false, // depends on env...??
})

const SECRET_KEY: string = process.env.SECRET_KEY!

fastify.register(jwt, { secret: SECRET_KEY })
// fastify.addHook('preHandler', (req, res, next) => {
//   // here we are
//   // console.log(fastify.jwt)
//   // req.jwt = fastify.jwt
//   return next()
// })

// cookies
fastify.register(fCookie, {
  secret: 'some-secret-key', //  @todo: key move to env
  // hook: 'preHandler',
})

fastify.get('/healthcheck', (req, res) => {
  res.send({ message: 'Success' })
})

async function main() {

  await addAdminJsToFastify(fastify)

  const apolloHandler = await getApolloHandler(fastify)
  fastify.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    // method: ['POST', 'OPTIONS''], // allow only POST and OPTIONS in prod
    handler: apolloHandler,
  })

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    console.log(`✨🚀 Fastify server ready at: http://localhost:3000/`)
    console.log(`✨🚀 GraphQL ready at: http://localhost:3000/graphql`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close()
    process.exit(0)
  })
})

void main()
