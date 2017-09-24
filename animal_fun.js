const fs = require('fs');

let letter = process.argv[2];
let list = [];

fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    list = data.split('\n').filter((el) => {
      if(el === ''){
        return;
      }
      return el[0].toLowerCase() === letter
    })
    let result = list.join('\n')
    fs.writeFile(`./${letter}_example.txt`, result , err => {
      if (err) {
        console.log(err);
      } else {
        console.log("file successfully written!");
      }
    })
    
  }
})
