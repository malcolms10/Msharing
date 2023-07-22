import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 100_000_000_000, // 100mb
      },
    })
    if (!upload) {
      return reply.status(400).send()
    }

    const mimeTypeRegex = /^(image|video|audio)\/[a-zA-Z]+/;
    const isValidFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFormat) {
      return reply.status(400).send()
    }
    const fieldId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fieldId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads', fileName),
    )

    await pump(upload.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  })
}