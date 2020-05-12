const createCloudExpensionArea = require('../../src/services/createCloudExpensionArea');
const doExpansionCloudSimulation = require('../../src/services/doExpansionCloudSimulation');

'use strict';

const cloudsExpansion = [];


module.exports = (router) => {

  router.post('/', (request, response) => {
    try {
      const { airports, clouds, verticalArea, horizontalArea } = request.body;

      const cloudExpansionBegin = createCloudExpensionArea({
        airports,
        clouds,
        verticalArea,
        horizontalArea
      });

      const simulation = doExpansionCloudSimulation({
        cloudExpansionAreaBegin: cloudExpansionBegin,
        verticalArea,
        horizontalArea
      });

      return response.json(simulation);
    } catch (err) {

      return response.status(400).json({ message: err });
    }

  });
}