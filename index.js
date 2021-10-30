const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT ||3000;



app.use(express.static(__dirname+'/public'));
app.get('/',(req, res) => {
   res.sendFile(__dirname + '/index.html');
})

// app.listen(PORT);
http.listen(PORT, function() {
    console.log('Connection Success %d',PORT);
})
const io = require( 'socket.io' )(http)
// io.on('connection',(socket) => {
//     console.log('Connected');

// })
// const io = require( 'socket.io' )(http)
// var users ={};

io.on('connection', socket => { 
  console.log('New User Connected');
  socket.on('message',(msg) => {
  socket.broadcast.emit('message', msg)
  //  users[socket.id]=msg.user;
  // socket.broadcast.emit('user-connected',msg)
  })
});
// io.listen(3000);

