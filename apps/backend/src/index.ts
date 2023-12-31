import 'reflect-metadata'

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import FastifyCors from '@fastify/cors'
import { FastifySteno } from '@stenodb/fastify'
import fastify from 'fastify'

import {
  AlchemyIngredient,
  alchemyIngredientAdapter,
  AlchemyService
} from './db.js'
import { alchemyRouter } from './router.js'

const app = fastify()

app.register(FastifyCors, {
  origin: 'https://crashmax-dev.github.io'
})

app.register(FastifySteno, {
  path: resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db'),
  entities: [AlchemyIngredient],
  adapters: [alchemyIngredientAdapter]
})

app.register((instance, _, done) => {
  const alchemyService = new AlchemyService(app)

  instance.register(
    (instance, _, done) => {
      alchemyRouter(instance, alchemyService)
      done()
    },
    { prefix: '/api' }
  )

  done()
})

const host = process.env.APP_IP ?? '0.0.0.0'
const port = process.env.APP_PORT ?? 3000

app.listen({ host, port }, (error, address) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Listening on ${address}`)
})
