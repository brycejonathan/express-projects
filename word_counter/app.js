const fs = require("fs");
const fileDir = "./text";

let tasks = [];
let wordCount = {};
let completedTasks = 0;

//Checking the amount of completed Tasks
function checkifComplete() {
  completedTasks++;

  if (completedTasks === tasks.length) {
    for (let index in wordCount) {
      console.log(`${index}: ${wordCount[index]}`);
    }
  }
}

//Increments word count and adds each occurence as property on wordCount object
function addCount(word) {
  wordCount[word] = wordCount[word] ? wordCount[word] + 1 : 1;
}

//Counts the number of words in text file
function countWord(text) {
  const words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort();
  words.filter(word => word).forEach(word => addCount(word));
}

//Retreiving list of files in text directory
fs.readdir(fileDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const task = (file => {
      return () => {
        fs.readFile(file, (err, text) => {
          if (err) throw err;
          countWord(text);
          checkifComplete();
        });
      };
    })(`${fileDir}/${file}`);
    tasks.push(task);
  });
  tasks.forEach(task => task());
});
