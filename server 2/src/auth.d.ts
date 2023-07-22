// fastify-jwt.d.ts
import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      admin: string
      seguidores: Number
      seguindo: Number
    } // user type is return type of `request.user` object
  }
}
