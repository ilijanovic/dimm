import { Server } from "socket.io";
import rpio from "rpio";

let pin = 12; /* P12/GPIO18 */
let range = 1024; /* LEDs can quickly hit max brightness, so only use */
let clockdiv = 8; /* Clock divider (PWM refresh rate), 8 == 2.4MHz */

/*
 * Enable PWM on the chosen pin and set the clock and range.
 */
rpio.open(pin, rpio.PWM);
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin, range);

const io = new Server(3005, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connection", socket.id);
});

io.on("connect", (socket) => {
  socket.emit("message", `welcome ${socket.id}`);
  socket.broadcast.emit("message", `${socket.id} joined`);

  socket.on("slider", function message(data: any) {
    rpio.pwmSetData(pin, data);
  });

  socket.on("disconnecting", () => {
    console.log("disconnected", socket.id);
    socket.broadcast.emit("message", `${socket.id} left`);
  });
});

export default function (req: any, res: any) {
  res.statusCode = 200;
  res.end();
}
