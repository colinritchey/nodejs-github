const fs = require('fs');
const http = require('http')
const querystring = require('querystring');
const url = require('url');

// let letter = process.argv[2];
let list = [];

const server = http.createServer((req, res) => {
  var queryData = url.parse(req.url, true).query;
  res.writeHead(200, {"Content-Type": "text/plain"});

  fs.readFile('./animals.txt', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      list = data.split('\n');
    }
  })

  if (queryData.letter) {
    list = list.filter((el) => {
      if(el === ''){
        return;
      }
      return el[0].toLowerCase() === queryData.letter
    });
  }

  res.end(list.join('\n'));

})

server.listen(8000, () => console.log("I'm listening on port 8000!"))
