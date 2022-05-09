const http = require('http');
/** 
 * Returns the object with 
 * the lowest priority number in a list
*/
module.exports.getLowestPriority = (serverList) => {
  serverList.sort((a, b) => a.priority - b.priority);
  return serverList[0];
}

// Exporting for testing purposes only
module.exports.getStatusCode = (url) => {
  return new Promise((resolve) => {
    http.get(url, { timeout:5000 },
      (res) => resolve(res.statusCode))
  })
};

// Sends a GET request given a server obj
module.exports.sendRequest = async (server) => {
  const statusCode = await exports.getStatusCode(server.url);

  return new Promise((resolve, reject) => {
    // Check if status code in range [200 - 299]
    if(statusCode.toString().startsWith("2"))
      resolve(server);
  
   reject("offline");
  })
}