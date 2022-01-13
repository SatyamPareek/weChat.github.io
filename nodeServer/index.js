//Node server which will handle socket io connections
const io=require('socket.io')(3000,{
    cors:{
        origin:'*',
    } //cors error
});//port is specified
const users={};
io.on('connection',socket=>{
  //  console.log("Connection made");
    socket.on('new-user-joined',name=>{
       // console.log(name ," joined the chat");
        users[socket.id]=name;
        socket.broadcast.emit('add-member',name);
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]});
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})


