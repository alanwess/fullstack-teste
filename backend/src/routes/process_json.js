const processorJSONController = require('../controllers/processorJSONController');

module.exports = async (fastify) => {
  fastify.post('/process_json', processorJSONController.processJSON);
};
