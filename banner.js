const chalk = require("chalk");
const boxen = require("boxen");
const clear = require("clear");
clear();
console.log(
  chalk.yellow.bold(
    boxen("Engage Auth Service - http://localhost:6406", {
      padding: 1,
      margin: 1
    })
  )
);
