const socket=io();

var username;
var chats=document.querySelector(".chats");
do{
    username=prompt("Enter ur name : ");
}while(!username);

socket.emit("new-user-joined",username); //event fired to tell the server side that a new user is joined

socket.on("user-connected",(socket_name)=>{
    userJoinleft(socket_name,'joined');
})
function userJoinleft(name,status){
  let div=document.createElement("div");
  div.classList.add('user-join');
  let content=`<p><b>${name}</b> ${status} the chat</p>`;
  div.innerHTML=content;
  chats.appendChild(div);
}