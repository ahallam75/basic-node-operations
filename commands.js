const fs = require("fs");

 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }

 function evaluateCmd(userInput) {
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
    default:
      done('File does not exist');
  }
 }

 const commandLibrary = {
     // echo
   "echo": function(userInput) {
    done(userInput);
   },

   "cat": function(fullPath) {
     const fileName = fullPath[0];
     fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        done(data);
     });
   },  

   "head": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const docArr = data.toString().split('\n');
        let tempArr = [];
        const n = 10;
        for (var i = 0; i < n; i++) {
          docArr[i] = docArr[i].replace(',', (i + 1)) + '\n';
          tempArr.push(docArr[i]);
        }
        done(tempArr);
    });
  },

  "tail": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const docArr = data.toString().split('\n');
        let tempArr = [];
        const s = docArr.length - 6;
        const n = docArr.length - 1;
        for (var i = s; i < n; i++) {
        docArr[i] = docArr[i].replace(',', i + 1) + '\n';
        tempArr.push(docArr[i]);
      }
      done(tempArr);
    });
  }

};

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;