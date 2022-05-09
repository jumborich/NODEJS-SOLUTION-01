"use strict"
const serverArray = require("./tests/fixtures/servers");
let utils = require("./utils");

// Find servers currently online
module.exports = () => {
  return new Promise((resolve, reject) => {
    Promise.all(
      serverArray.map(server => utils.sendRequest(server)))
      .then((response) => {

        // If online, sort by least priority number
        resolve(utils.getLowestPriority(response));
      })
      .catch(err => reject("servers offline"))
  });
};