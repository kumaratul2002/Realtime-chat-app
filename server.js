const http=require("http");
const express=require("express");
const app=express();

const server=http.createServer(app);
const port=process.env.PORT||3000;

app.use(express.static(__dirname+'/public'));//when working with nodejs css and js jaise static files acquire krne ke liye ye krte 
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});
// Socket io setup

const io=require("socket.io")(server);//it tells socket ki usse kahan chalna hai
var users=[];  //variable to store all new users joined with userid and username
io.on("connection",(socket)=>{
    socket.on("new-user-joined",(username)=>{  //whenever a user calls an event named new-user-joined hmm given callback function ko call krdenge
        users[socket.id]=username;
        socket.broadcast.emit("user-connected",username); //serer ek mssg broadcast krega jisse ki sabhi ko pata chal jaye ki ek new user ne join kiya hai aur isse client side pe receive krenge 
        io.emit("user-list",users);//io.emit is used to inform all sockets therefore socket.emit is not used kyunki humme sirf connected walon ko info pass nhi krni sbko krni hai
    })

    socket.on("disconnect",()=>{
        socket.broadcast.emit('user-disconnected',user=users[socket.id]);
        delete users[socket.id];
        io.emit("user-list",users);  
    });
    socket.on('message',(data)=>{
        socket.broadcast.emit("message",{user:data.user,msg:data.msg})
    });
});  

// Socket io setup ends
server.listen(port,()=>{
    console.log("server started at port : "+port);
});