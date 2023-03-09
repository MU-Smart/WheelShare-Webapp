const testURL = 'http://mypathweb.csi.miamioh.edu:8081/testRoute';


/**
 * Function to get the route information from a given url with an API endpoint
 * 
 * @param {string} url the API endpoint that the path data is being retrieved from.
 * 
 * @returns {Object} path This is an array that contains the array of lat/lng coordinates
 *                  for MapPath to read as well as the path information to determine the 
 *                  path color based on average uncomfort score.
 */
export function getPath(url) {
  let pathData = [];
  let pathInfo = [];
  let path = [pathData, pathInfo];

  fetch(url, {mode: "no-cors", credentials: "omit"})
    .then(response => {
      for (i = 0; i < response.nodeCount; i++) {
        pathData.push({"lat" : nodeList[i].latitude, "lng" : nodeList[i].longtitude});
      }
      pathInfo.push(response.totalUncomfortScore);
      pathInfo.push(response.averageUncomfortScore);
      pathInfo.push(response.maxUncomfortScore);
      pathInfo.push(response.nodeCount);
      return path;
    })
    .catch(error => {
      console.error(error);
    })
}


