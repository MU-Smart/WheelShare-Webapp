/**
<<<<<<< HEAD
 * Function to get the route information from a given url with an API endpoint
 *
 * @param {string} url the API endpoint that the path data is being retrieved from.
 *
 * @returns {Object} path This is an array that contains the array of lat/lng coordinates
 *                  for MapPath to read as well as the path information to determine the
=======
 * Function to get the route information from a given url with an API endpoint.
 * 
 * It is important to note that in the development environment, a proxy must be 
 * used to satisfy the CORS restrictions present on the backend server. The production
 * code will need to have updated urls to access the data from, as the proxy will not be used.
 * 
 * To setup the proxy in the development environment, navigate to package.json and add a line:
 * "proxy" : "http://mypathweb.csi.miamioh.edu:8081/" or a different target address.
 * Then, make your api calls using local notation.
 * For example: fetch('http://mypathweb.csi.miamioh.edu:8081/api/endpoint')
 * becomes: fetch('/api/endpoint') after the proxy is added.
 * 
 * @param {string} url the url of the API endpoint that the path data is being retrieved from.
 * 
 * 
 * @returns {promise<Object>} An array that contains the array of lat/lng coordinates
 *                  for MapPath to read as well as the path information to determine the 
>>>>>>> dabb6db (Added comments)
 *                  path color based on average uncomfort score.
 * @example
 * <MapPath path={getPath('API Endpoint URL')}></MapPath>
 */
const axiosRequest = require('axios');

const testURL = "/api/testRoute";

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
