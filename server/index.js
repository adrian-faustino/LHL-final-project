const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');


// constants
const PORT = process.env.PORT || 5555


// middleware
//app.use(cors())  --> uncomment when we need


// basic testroutes
app.get('/', (req, res) => {
  res.json({message: "This is the '/' route!"})
})
app.get('/test', (req, res) => {
  res.json({message: "This is the '/test' route!"})
})


// socket
io.on('connection', client => {
  console.log('A user connected!');
  
  io.emit('welcome', {message: 'Welcome user!'})
})


// server
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})