//NODE.JS SERVER
//Always call next() when sending the response

const app = require("./backend/app");  // IMPORT APP.JS EXPRESS FILE
const debug = require("debug")("node-angular"); // IMPORT DEBUG for nodemon
const http = require("http");

//Normalize port function makes sure that we have a Valid Port Number
const normalizePort = val => {
  var port = parseInt(val, 10);   // parseInt converts a string to an integer

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// SETTING THE PORT WITH normalizePort function validator
const port = normalizePort(process.env.PORT || "3000");

// SETTING THE PORT WITH 'port' KEY AND port CONSTANT in EXPRESS APP
app.set("port", port);


//Will check what type of error ocurred, log something different  and exit from node.js server
const onError = error => {
  if (error.syscall !== "listen") {       //error.syscall--> returns a string that tells syscall failed//syscall--> system call is a fundamental interface between an application and linux kernel
    throw error;
  }
  const finalPort = typeof port === "string" ? "pipe " + port : "port " + port; //ternary operator if type of port is string? true false :PIPE or PORT
  switch (error.code) {
    case "EACCES":                                            // permission denied
      console.error(finalPort + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":                                        // already in use
      console.error(finalPort + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Outputs the fact that we are listening to the PORT
const onListening = () => {
  const finalPort = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + finalPort);
};


//SET THE NODE SERVER
const server = http.createServer(app);
server.on("error", onError);           // REGISTER LISTENER FOR ERROR
server.on("listening", onListening);  //  REGISTER LISTENER FOR LISTENING PORT
server.listen(port);                       //   START THE SERVER
