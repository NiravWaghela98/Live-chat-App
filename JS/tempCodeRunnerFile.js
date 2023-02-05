const socket = io('http://localhost:3002');

// Get DOm elements in respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');



var audio = new Audio('./img/join.mp3')
var audio2 = new Audio('./img/left.mp3')
// var audio3 = new Audio('./img/noti.mp3')



// Function which will append to the container

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // if (message.includes('user-joined',name)) {
    //     audio.play();
    //   } else if (message.includes('left')) {
    //     audio2.play();
    //   }
        
        
        
    }
    
    // ask new user for his/her name let the server know 
    const name = prompt('Enter Your Name To Join');
    socket.emit('new-user-joined', name);
    
    // if a new user joins, let the server know
    socket.on('user-joined', name  =>{
        append(`${name} joined the chat`, 'right' )
    })

    // if server sends a message receive it
    socket.on('receive', data =>{
        append(`${data.name}: ${data.message}`, 'left')
    })

    // if a user leaves the chat append the info to the container
    socket.on('left', name =>{
        append(`${name} left the chat`, 'left')
    })
    
    // if the form get submitted send server the message
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const message = messageInput.value;
        append(`You: ${message}`, 'right')
    socket.emit('send',message);
    messageInput.value = "";
})


socket.on('user-joined', () => {
    audio.play();
  });
  
  socket.on('left', () => {
    audio2.play();
  });
 
 