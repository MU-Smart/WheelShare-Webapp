const testURL = 'http://mypathweb.csi.miamioh.edu:8081/testRoute';

/**
 * Function to get the route information from a given url with an API endpoint
 *
 * @param {string} url the API endpoint that the path data is being retrieved from.
 *
 * @returns {promise<Object>} path This is an array that contains the array of lat/lng coordinates
 *                  for MapPath to read as well as the path information to determine the
 *                  path color based on average uncomfort score.
 */
export async function getPath(url) {
  let pathData = [];
  let pathInfo = [];
  let path = [pathData, pathInfo];

  let response = null;

  response = await fetch(url);

  fetch(url).then((res) => (response = res));

  return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pathData.push(data.averageUncomfortScore);
      pathData.push(data.maxUncomfortScore);
      pathData.push(data.totalUncomfortScore);
      for (let i = 0; i < data.nodeCount; i++) {
        pathInfo.push({
          lat: data.nodeList[i].latitute,
          lng: data.nodeList[i].longtitude,
        });
      }
      console.log(path[1]);
      return path[1];
    })
    .catch((error) => {
      console.error(error);
    });
}
