const express = require("express");
const app = express();
const io = require("socket.io")(server);
app.listen(4000);
app.use(express.static(__dirname + "/public"));

var counter = 0;

io.on("connection", function(socket){
    socket.emit("button_counter", {counter: counter});
    socket.on("button", function(data){
        counter++;
        io.socket.emit("button_counter", {counter: counter});
    });
    socket.on("reset", function(data){
        counter = 0;
        io.socket.emit("button_counter", {counter: counter});
    });
});