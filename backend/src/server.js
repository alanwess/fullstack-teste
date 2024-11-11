const fastify = require('./app');

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    console.log('Servidor rodando em http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();