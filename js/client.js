const socket=io('http://localhost:3000');

const form=document.getElementById("send-container");
const messageInput=document.getElementById("messageInput");
const messageContainer=document.querySelector(".container");
const audio=new Audio('notification.mp3');





const append = (message,position)=>{
const messageElement=document.createElement("div");
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='left')
audio.play();
}


const appendMember = (name)=>{
    const memberElement=document.createElement("div");
    memberElement.innerText=name;
    memberElement.classList.add('member');
    members.append(memberElement);

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();//page will not reload
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})

const user = prompt("Enter your name to join");
socket.emit('new-user-joined',user);

socket.on('add-user',name=>{
    appendMember(name);
})

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
})

socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`,'right');
})