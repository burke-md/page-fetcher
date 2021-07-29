const request = require("request");
const fs = require("fs");
const readline = require("readline");

const webAddress = String(process.argv.slice(2, 3));
let filePath = String(process.argv.slice(3));

//use readline object
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// write file refactor
const writeNewFile = (filePath, body) => {
  fs.writeFile(filePath, body, (error) => {
    // const fileSize = 5;
    const fileSize = fs.statSync(filePath).size;
    // console.log(fileSize)
    exitMsg(fileSize);
    process.exit();
  });
};


//Print to console before endig.
const exitMsg = (fileSize) => {
  console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}.`);
};


request(webAddress, function (error, response, body) {
  if (!fs.existsSync(filePath)) {
    //No existing file w/ this name. Create file
    writeNewFile(filePath, body);
  } else if (fs.existsSync(filePath)) {
    //File w/ name already in system. Prompt for new file name.
    rl.question(
      "File already exists. Please enter new file pather followed by ENTER  ",
      (answer) => {
        filePath = answer;
        writeNewFile(filePath, body);
        rl.close();
      }
    );
  }
});

