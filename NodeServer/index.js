// Node Server Which will handle socket io connections

const io = require('socket.io')(3002);

const users = {};

io.on('connection', socket => {
    //if any new user joined let other users connected to the server know that new user has joined
    socket.on('new-user-joined', name => {
        // console.log("New User", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)

    });
    // if someone sends a message broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    // if someone leaves the chat, let other knows
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });

    // send file event
   
  socket.on("send-file", file => {
    // Broadcast the "file-data" event
    socket.broadcast.emit("file-data", file);
});
})


