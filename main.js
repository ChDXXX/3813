const {User,Rooms}  = require('./index')
 var http = require('http').Server(app);
 var io = require('socket.io')(http);
 
 //login page
 app.get('/', function(req, res){
    res.sendfile('index.html');
   });

 io.on('connection', client => {
     let user = new User();
     client.emit('user',user);
     client.on('join', data => {
         /* join room */
         Rooms.join(data,user,io,client)
     });
     client.on('message',msg=>{
         if(user.roomId){
             // io.to(user.roomId).emit('message',msg)
             if(msg.type == 'update'){
                 user.update(msg.body);
             }
             msg.user = user.uid;
             Rooms.send(user.roomId,msg)
         }else{
             io.emit('message',msg)
         }
         console.log(msg)
     })
     client.on('disconnect', () => {
         /* … */
         console.log("disconnect")
         Rooms.leave(user)
     });
 });
 http.listen(3000, function(){
    console.log('listening on *:3000');
   });