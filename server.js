const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
//body parser
app.use(bodyParser.urlencoded({extended: true}));
//views
app.use(express.static(__dirname + "/views"));
//css
app.use(express.static(__dirname + "/css"));
//ejs
app.set('view engine', 'ejs');
//routes
app.get("/", function(request, response) {
    response.render("index");
});
//port
const server = app.listen(8000, function() {
	console.log("listening on port 8000");
});
//socket.io
const io = require('socket.io')(server); //establishing connection
io.sockets.on('connection', function (socket) {
    // console.log(socket.id);
    socket.on("new_user", function() { // handling the new user with socket id
        console.log(socket.id);
		socket.broadcast.emit("new_user_joined", {response: "Socket ID <span class='socket-id'>"+ socket.id +"</span> joined us!"});
	});
    socket.on("disconnect", function(){ // handling the disconnection of a user
		socket.broadcast.emit("user_disconnect", {response: "Socket ID <span class='socket-id'>"+ socket.id +"</span> left us!"})
	})
    socket.on("button_clicked", function(){ //handling the user who triggered the button with socket id
        console.log(socket.id);
        socket.broadcast.emit("user_clicked_button", {response: "Socket ID <span class='socket-id'>"+ socket.id +"</span> just triggered a notification!"});    
    })
});