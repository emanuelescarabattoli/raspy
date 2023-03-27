const fs = require("fs");

let beeperPin = undefined

try {
  const Gpio = require("onoff").Gpio;
  beeperPin = new Gpio(21, "out");
} catch (error) {
  fs.writeFileSync("/home/emanuele/Downloads/raspy/error.txt", error.message);
}

const beep = () => {
  try {
    beeperPin.writeSync(1);
    setTimeout(() => {
      beeperPin.writeSync(0);
    }, 500);
    return "done";
  } catch (error) {
    fs.writeFileSync("~/Downloads/raspy/error.txt", error.message);
  }
}

beep();