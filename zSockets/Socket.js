
// Socket.IO Events
exports.init = (http) => {
    const socketIO = require('socket.io')(http, {
        cors: {
            origin: ["http://localhost:3000","https://zicogames.onrender.com/"]
        }
    });

    // socket functions
    socketIO.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);

        //listen messege log
        socket.on('message', (data) => {
            socketIO.emit('messageResponse', data);
          });        

        //disconnect
        socket.on('disconnect', () => {
          console.log('🔥: A user disconnected');
        });
    });
}