const pluck = require('../bare_minimum/promiseConstructor');
const fs = require('fs');
const Promise = require('bluebird');
/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */


var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // TODO
  // 1. Reads each file at the path in the `filePaths` array

  var arr = filePaths.map((file) => { return pluck.pluckFirstLineFromFileAsync(file); });
  return (
    Promise.all(arr)
      .then((values) => {
        // console.log('values', values.join('\n'));
        return values.join('\n');
      })
      .then((largeStr) => {
        console.log('largeString', largeStr);
        Promise.promisify(fs.writeFile)(writePath, largeStr);
      })
      .then((result) => { console.log('result', result); })
      .catch((err) => { console.log(err); })
  );
  // access the directory to real all the files and convert each file into a new promise
  //Pass in the array of promises(map(pluckfirstLine(file))) to promise.all
  // .then(join the array into a string)
  // .then(write new string into the new file)
  // 2. Plucks the first line of each file
  // 3. Joins each first line into a new file
  //     - The lines should be in the same order with respect to the input array
  //     - i.e. the second line in the new file should be the first line of `filePaths[1]`
  // 4. Writes the new file to the file located at `writePath`
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};