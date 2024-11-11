const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors')

fastify.register(cors, {
    origin: "*"
});

const process_json_router = require('./routes/process_json')

fastify.register(process_json_router);

module.exports = fastify;