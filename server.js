const express = require("express");
const app = express();
const server = app.listen(4000);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

var counter = 0;

io.on("connection", function(socket){
    socket.emit("button_counter", {counter: counter});
    socket.on("pressed", function(data){
        counter++;
        console.log(counter);
        io.sockets.emit("button_counter", {counter: counter});
        console.log(counter);
    });
    socket.on("reset", function(data){
        counter = 0;
        io.sockets.emit("button_counter", {counter: counter});
    });
});