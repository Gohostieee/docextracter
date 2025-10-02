import Fastify from 'fastify';
import extractRoutes from './routes/extract.js';

const fastify = Fastify({
  logger: true
});

// Register CORS
fastify.register(import('@fastify/cors'), {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
});

// Register routes
fastify.register(extractRoutes);

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({
    success: false,
    error: 'Internal server error'
  });
});

export default fastify;