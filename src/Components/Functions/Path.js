/**
 * Function to get the route information from a given url with an API endpoint
 *
 * @param {string} url the API endpoint that the path data is being retrieved from.
 *
 * @returns {Object} path This is an array that contains the array of lat/lng coordinates
 *                  for MapPath to read as well as the path information to determine the
 *                  path color based on average uncomfort score.
 * @example
 * <MapPath path={getPath('API Endpoint URL')}></MapPath>
 */
const axiosRequest = require('axios');

export async function getPath(url) {
  try {
    let response = await axiosRequest.get(url)
    let pathCoords = [];
    for (let i = 0; i < response.data.nodeCount; i++) {
      pathCoords.push(
        {lat: response.data.nodeList[i].latitute, lng: response.data.nodeList[i].longtitude}
      )
    }
    return pathCoords;
  } catch (error) {
    console.log(error);
  }
}
