const beeperPin = undefined

try {
  const Gpio = require("onoff").Gpio;
  beeperPin = new Gpio(21, "out");
} catch (error) {
  console.log(error.message);
}

const beep = () => {
  try {
    beeperPin.writeSync(1);
    setTimeout(() => {
      beeperPin.writeSync(0);
    }, 500);
    return "done";
  } catch (error) {
    console.log(error.message);
  }
}

beep();