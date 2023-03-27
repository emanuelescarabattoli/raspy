const fs = require("fs");
const Gpio = require("onoff").Gpio;

const beeperPin = new Gpio(21, "out");

const beep = () => {
  try {
    beeperPin.writeSync(1);
    setTimeout(() => {
      beeperPin.writeSync(0);
    }, 500);
    return "done";
  } catch (error) {
    fs.writeFileSync("/home/emanuele/Downloads/raspy/error-beep.txt", error.message);
  }
}

beep();