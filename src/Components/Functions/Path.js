const testURL = '/api/testRoute';

/**
 * Function to get the route information from a given url with an API endpoint.
 * It is important to note that in the development environment, a proxy must be 
 * used to satisfy the CORS restrictions present on the backend server. The production
 * code will need to have updated urls to access the data from, as the proxy will not be used.
 * 
 * @param {string} url the url of the API endpoint that the path data is being retrieved from.
 * 
 * 
 * @returns {promise<Object>} An array that contains the array of lat/lng coordinates
 *                  for MapPath to read as well as the path information to determine the 
 *                  path color based on average uncomfort score.
 * @example
 * <MapPath path={getPath('API Endpoint URL')}></MapPath>
 */
export async function getPath(url) {
  // Array to hold the coordinates that the path follows.
  let pathData = [];

  // Array to hold the information about the path (avg/max/total uncomfort score)
  let pathInfo = [];

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pathInfo.push(data.averageUncomfortScore);
      pathInfo.push(data.maxUncomfortScore);
      pathInfo.push(data.totalUncomfortScore);

      // Add all coordinates from the nodes recieved from the API endpoint
      for (let i = 0; i < data.nodeCount; i++) {
        pathData.push({ lat: data.nodeList[i].latitute, lng: data.nodeList[i].longtitude });
      }

      // Update return object
      data = [pathData, pathInfo];

      // Return cleaned JSON data
      return data;
      // console.log(data[0]);
    })
    .catch(error => {
      console.error(error);
    })
}
