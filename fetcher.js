const arg = process.argv;
const givenURL = arg[2];
const givenFile = arg[3];

const request = require('request');
const fs = require('fs');

request(givenURL, (error, response, body) => {
  if (error) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
  }
  fs.writeFile(givenFile, body, err => {
    const stats = fs.statSync(givenFile, (err, data) =>{
      if (!err) {
        return data;
      }
      console.log(`fs.stat err:`, err);
    });

    if (!err) {
      console.log(`Downloaded and saved ${stats.size} bytes to ${givenFile}`);
      return;
    }
  });
});

