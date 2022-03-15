/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var gitHubReq = require('./promisification');
var readFirst = require('./promiseConstructor');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  // (1) reads a GitHub username from a `readFilePath`
  //      (the username will be the first line of the file)
  return (readFirst.pluckFirstLineFromFileAsync(readFilePath)
  //  (2) then, sends a request to the GitHub API for the user's profile
    .then((username) => gitHubReq.getGitHubProfileAsync(username))
    //  (3) then, writes the JSON response of the API to `writeFilePath`
    .then((response) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, JSON.stringify(response), (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    })
    .catch((err) => console.log(err))
  );
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
