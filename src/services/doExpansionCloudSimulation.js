const calculateCloudExpansion = require('../utils/calculateCloudExpansion');

module.exports = function doExpansionCloudSimulation({
  cloudExpansionAreaBegin,
  verticalArea,
  horizontalArea
}) {

  const expansionSimulation = {
    daysToFirstAirportBeHidden: null,
    daysToAllAirportsBeHidden: null,
    simulation: [{
      title: "Day 1",
      area: cloudExpansionAreaBegin
    }]
  };

  if (!cloudExpansionAreaBegin) {
    throw 'cloudExpansionAreaBegin is a required param';
  }

  let thereAreAirports = true;

  while (thereAreAirports) {

    const loop = expansionSimulation.simulation.length;
    const currentArea = expansionSimulation.simulation[loop - 1].area;

    const cloudExpansionArea = JSON.parse(JSON.stringify(currentArea));

    const expansion = calculateCloudExpansion({
      cloudExpansionArea: cloudExpansionArea,
      verticalArea,
      horizontalArea
    });

    expansion.map(positions => {

      if (
        expansionSimulation.daysToFirstAirportBeHidden === null &&
        cloudExpansionArea[positions.positionV][positions.positionH] === "A"
      ) {

        expansionSimulation.daysToFirstAirportBeHidden = loop + 1;
      }

      cloudExpansionArea[positions.positionV][positions.positionH] = "*";
    });

    expansionSimulation.simulation.push({
      title: `Day ${loop + 1}`,
      area: cloudExpansionArea
    });

    const thereAreAnyAirport = cloudExpansionArea.reduce(function (valorRetorno, valorArray) {

      valorArray.map(value => {
        valorRetorno.push(value);
      });

      return valorRetorno;
    }, []).find(item => item === "A");

    if (!thereAreAnyAirport) {
      expansionSimulation.daysToAllAirportsBeHidden = loop + 1;
      thereAreAirports = false;
    }

  }

  expansionSimulation.simulation.map(item => {

    console.log(item.title);
    console.table(item.area);

  });

  return expansionSimulation;
};