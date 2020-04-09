const request = require('request');
const userInput = process.argv.slice(2);

request('https://api.thecatapi.com/v1/breeds/search?q='.concat(userInput[0]), (errorMain, response, body) => {
  const data = JSON.parse(body);
  if (response.statusCode !== 200) { // HTTP code error
    console.log(response.statusCode);
    console.log(data);
  } else {
    try {
      if (data.length !== 0) {  // happy path
        console.log("result: ", data);
        console.log("result type: ", typeof data);
        console.log("desc: ",data[0].description);
      } else { // status 200 but no results
        console.log('statusCode:', response && response.statusCode);
        console.log("result not found");
      }
    } catch (error) { // other errors
      console.log('error:', error.message);
      console.log('statusCode:', response && response.statusCode);
    }
  }
});