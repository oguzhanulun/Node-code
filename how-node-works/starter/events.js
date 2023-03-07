const EventEmitter = require("events");
const http = require("http");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
  console.log("there was a new sale");
});
myEmitter.on("newSale", () => {
  console.log("there was another new sale");
});

myEmitter.on("newSale", (stock) => {
  console.log(`there are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);

///////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received");
  res.end("request received");
});

server.on("request", (req, res) => {
  console.log("Another request received");
});

server.on("close", () => {
  console.log("Server Closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for requests");
});
