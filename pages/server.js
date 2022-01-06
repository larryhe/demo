/** @format **/
const https = require("https");
//const http = require("http");
const querystring = require("querystring");
const url = require("url");
const fs = require('fs');

const options2 = {
  key: fs.readFileSync('/Users/larryhe/cert/server.key'),
  cert: fs.readFileSync('/Users/larryhe/cert/server.cert')
};
const port = 3002;
https.createServer(options2, function onRequest(req, response) {
    console.log(`incoming request url===${req.url}`);
    https.get('https://www.nordstrom.com', res => {
        let data = [];
        // const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        // console.log('Status Code:', res.statusCode);
        // console.log('Date in Response header:', headerDate);
        // Object.entries(res.headers).forEach(([key, value]) => {
        //     console.log(`${key}: ${value}`);
        // });
        res.on('data', chunk => {
          data.push(chunk);
        });
      
        res.on('end', () => {
          console.log('Response ended: ');
          //console.log();
          response.setHeader("Content-Type", "text/html");
          response.writeHead(200);
          response.end(data.join(''));
        });
      }).on('error', err => {
        console.log('Error: ', err.message);
      });
    }).listen(port);


console.log(`listening on port ${port}`);
