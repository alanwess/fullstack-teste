exports.processJSON = async (request, reply) => {

  function cleanData(data){
    if (Array.isArray(data)) {
      return data
        .map(item => cleanData(item)) 
        .filter(item => item !== null);
    } else if (typeof data === 'object' && data !== null) {
      return Object.entries(data).reduce((acc, [key, value]) => {
        const cleanedValue = cleanData(value); 
        if (cleanedValue !== "" && cleanedValue !== "#" && cleanedValue !== null) {
          acc[key] = cleanedValue;
        }
        return acc;
      }, {});
    }
  
    return data !== "" && data !== "#" ? data : null;
  }

  try {
    const body = JSON.parse(request.body)
    const parsed_json = JSON.parse(body.target_json)

    if (!parsed_json)
      reply.code(400).send({ success: false, error: 'JSON enviado inválido!' });

    reply.code(200).send({ success: true, data: JSON.stringify(cleanData(parsed_json)) });
  } catch (error) {
    reply.code(500).send({ success: false, error: error.toString() });
  }
};