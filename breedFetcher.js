const request = require('request');

/* Refactor the code in breedFetcher.js by moving the main request logic into a function named fetchBreedDescription.

This function should call the callback with either an error if there's a error or null if there isn't, for the first argument.
The table below shows in more detail what to pass into callback for each of the two scenarios.

outcome	| error value   	               | description value
success	|   null	                       | (the description from body)
failure	|(the error we get from request) |	null
*/
const fetchBreedDescription = function(breedName, callback) {
  request('https://api.thecatapi.com/v1/breeds/search?q='.concat(breedName), (errorMain, response, body) => {
    const data = JSON.parse(body);
    if (response.statusCode !== 200) { // HTTP code error
      return callback(data);
    } else {
      try {
        if (data.length !== 0) {  // happy path
          return callback(null, data);
        } else { // status 200 but no results
          return callback("result not found");
        }
      } catch (error) { // other errors
        return callback(error);
      }
    }
  });

};


module.exports = { fetchBreedDescription };