module.exports = function calculateCloudExpansion({
  cloudExpansionArea,
  verticalArea,
  horizontalArea
}) {

  const clouds = new Array();

  const vertical = verticalArea - 1;
  const horizontal = horizontalArea - 1;

  for (let v = 0; v < verticalArea; v++) {
    for (let h = 0; h < horizontalArea; h++) {

      const areaValue = cloudExpansionArea[v][h];

      if (areaValue === "*") {

        const positionVLess = (v - 1) > 0 ? (v - 1) : 0;
        const positionVPlus = (v + 1) < vertical ? (v + 1) : vertical;
        const positionHLess = (h - 1) > 0 ? (h - 1) : 0;
        const positionHPlus = (h + 1) < horizontal ? (h + 1) : horizontal;


        if ("*" !== cloudExpansionArea[positionVLess][h]) {
          clouds.push({
            positionV: positionVLess,
            positionH: h
          });
        }

        if ("*" !== cloudExpansionArea[positionVPlus][h]) {
          clouds.push({
            positionV: positionVPlus,
            positionH: h
          });
        }

        if ("*" !== cloudExpansionArea[v][positionHLess]) {
          clouds.push({
            positionV: v,
            positionH: positionHLess
          });
        }

        if ("*" !== cloudExpansionArea[v][positionHPlus]) {
          clouds.push({
            positionV: v,
            positionH: positionHPlus
          });
        }
      }
    }
  }

  return clouds;
};