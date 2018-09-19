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
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default: console.log("Command not found");
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
        const n = docArr.length; 
        for (var i = 0; i < n; i++) { 
            docArr[i] = docArr[i].replace(',', (i + 1)) + '\n'; 
            tempArr.push(docArr[i]); 
        } 
        done(tempArr.join('')); 
    }); 
  },

  "tail": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const docArr = data.toString().split('\n');
        let tempArr = [];
        const n = docArr.length;
        for (var i = docArr.length - 1; i >= 0; i--) {
        docArr[i] = docArr[i].replace(',', i + 1) + '\n';
        tempArr.push(docArr[i]);
      }
        done(tempArr.join(''));
    });
  }

};

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;