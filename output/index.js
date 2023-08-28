"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var rpio_1 = __importDefault(require("rpio"));
var pin = 12; /* P12/GPIO18 */
var range = 1024; /* LEDs can quickly hit max brightness, so only use */
var max = 128; /*   the bottom 8th of a larger scale */
var clockdiv = 8; /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
var interval = 5; /* setInterval timer, speed of pulses */
var times = 5; /* How many times to pulse before exiting */
/*
 * Enable PWM on the chosen pin and set the clock and range.
 */
rpio_1.default.open(pin, rpio_1.default.PWM);
rpio_1.default.pwmSetClockDivider(clockdiv);
rpio_1.default.pwmSetRange(pin, range);
/*
 * Repeatedly pulse from low to high and back again until times runs out.
 */
var direction = 1;
var data = 0;
var pulse = setInterval(
  function () {
    rpio_1.default.pwmSetData(pin, data);
    if (data === 0) {
      direction = 1;
      if (times-- === 0) {
        clearInterval(pulse);
        rpio_1.default.open(pin, rpio_1.default.INPUT);
        return;
      }
    } else if (data === max) {
      direction = -1;
    }
    data += direction;
  },
  interval,
  data,
  direction,
  times
);
