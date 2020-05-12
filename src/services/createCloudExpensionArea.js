const randomNumberBetweenTwo = require('../utils/randomNumberBetweenTwo');

module.exports = function createCloudExpensionArea({
  airports,
  clouds,
  verticalArea,
  horizontalArea
}) {

  if (isNaN(airports) || airports < 4) {
    throw 'Quantity of airports is invalid!';
  }

  if (isNaN(clouds) || clouds < 3) {
    throw 'Quantity of clouds is invalid!';
  }

  if (isNaN(verticalArea) || verticalArea < 10 || isNaN(horizontalArea) || horizontalArea < 10) {
    throw 'Area is invalid!';
  }

  const cloudExpansion = [];


  for (let v = 0; v < verticalArea; v++) {

    const row = new Array();

    for (let h = 0; h < horizontalArea; h++) {

      row.push("");
    }

    cloudExpansion.push(row);
  }

  const vertical = verticalArea - 1;
  const horizontal = horizontalArea - 1;

  let aCount = 0;

  while (aCount < airports) {

    const verticalRandom = randomNumberBetweenTwo(0, vertical);
    const horizontalRandom = randomNumberBetweenTwo(0, horizontal);

    if ("A" !== cloudExpansion[verticalRandom][horizontalRandom]) {

      cloudExpansion[verticalRandom][horizontalRandom] = "A";
      aCount++;
    }
  }

  let cCount = 0;

  while (cCount < clouds) {

    const verticalRandom = randomNumberBetweenTwo(0, vertical);
    const horizontalRandom = randomNumberBetweenTwo(0, horizontal);

    if (
      "A" !== cloudExpansion[verticalRandom][horizontalRandom] &&
      "*" !== cloudExpansion[verticalRandom][horizontalRandom]
    ) {

      cloudExpansion[verticalRandom][horizontalRandom] = "*";
      cCount++;
    }
  }

  return cloudExpansion;
};