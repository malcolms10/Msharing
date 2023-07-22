import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";


export async function userRoutes(app: FastifyInstance) {
  app.get('/actualizar/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });
  
    const { id } = paramsSchema.parse(request.params);
  
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
  
    if (!user) {
      return reply.status(404).send({ error: 'Usuário não encontrado' });
    }
  
    return user;
  });
  
    app.get('/user', async (request) => {
      const users = await prisma.user.findMany({
        orderBy: {
          name: 'asc',
        },
      })
      return users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          passe: user.passe,  
          admin: user.admin,       
        }
      })
    })
  
    app.get('/user/:email', async (request, reply) => {
        const paramsSchema = z.object({
            email: z.string(),
        })
      
        const { email } = paramsSchema.parse(request.params)
      
        const user = await prisma.user.findUniqueOrThrow({
            where: {
              email,
            },
        })
        return user
    })

    app.get('/user/search/:name', async (request, reply) => {
      const paramsSchema = z.object({
          name: z.string(),
      })
    
      const { name } = paramsSchema.parse(request.params)
    
      const user = await prisma.user.findMany({
          where: {
            name,
          },
      })
      return user
  })
  
  app.get('/dadouser/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
  
    const { id } = paramsSchema.parse(request.params);
  
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  
    return user;
  });

    app.post('/user', async (request) => {
            const bodySchema = z.object({
                name: z.string(),
                email: z.string(),
                passe: z.string(),  
                admin: z.string(), 
                about: z.string(),
            })
        
            const { name, email, passe , admin, about} = bodySchema.parse(request.body)
        
            const user = await prisma.user.create({
              data: {
                name, email,passe, admin , about},
            })
            return user
    })
  
    app.put('/user/:email', async (request, reply) => {
        const paramsSchema = z.object({
          email: z.string(),
        })
      
        const { email } = paramsSchema.parse(request.params)
      
        const bodySchema = z.object({
          name: z.string(),
 
        })
      
        const { name } = bodySchema.parse(request.body)
      
        let user = await prisma.user.findUniqueOrThrow({
          where: {
            email,
          },
        })
      
        user = await prisma.user.update({
          where: {
            email,
          },
          data: {
              name},
        })
      
        return user
    })
  
    app.delete('/user/:id', async (request, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
          })
      
          const { id } = paramsSchema.parse(request.params)
      
          const user = await prisma.user.findUniqueOrThrow({
            where: {
              id,
            },
          })
      
          await prisma.user.findUniqueOrThrow({
            where: {
              id,
            },
          })
    })
}