//本機ip: 172.20.10.2
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = 5001;
const { Server } = require('socket.io');
const io = new Server(server);
app.get('/ncku', (req, res) => {
  res.send('<button><h1>click me!</h1></button>')
}) 
app.get('/', (req,res) =>{
  res.sendFile(__dirname + '/index.html');
})
app.use('/css', express.static('css'));
server.listen(port,{0.0.0.0})
let onlineCount = 0;
io.on('connection', (socket) => {
  onlineCount++;
  console.log('a user connected.', onlineCount, 'online');

  socket.on('disconnect', () => {
    onlineCount = (onlineCount <= 0) ? 0 : onlineCount -= 1;
    console.log('user disconnected', onlineCount, 'online');
  });
  socket.on('myMessage' , (msg) => {
    io.emit('allMessage', msg);
    console.log(msg);
  });
});
