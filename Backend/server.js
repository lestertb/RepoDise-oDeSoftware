require('dotenv').config();
const http = require('http'); //Librería para crear el servidor
const app = require('./app'); //Librería con todas las rutas, middlewares y demás

//Configuración del servidor
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    credentials: false
  }
});

//Test socket.io
var grid = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];
   io.on("connection", socket => {
     console.log(grid[2]);
     io.emit("grid", grid);
     io.on("move", data =>{
      io.emit("grid", grid);
    });
  });

//Mensaje de que el servidor está iniciado
server.listen(port, () => {
  console.log(`[El servidor está corriendo en la dirección '${host}:${port}']`);
});

module.exports = server;
