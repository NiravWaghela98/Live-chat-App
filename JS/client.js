const socket = io('http://localhost:3002');

// Get DOm elements in respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const fileInput = document.getElementById("file-input");
const customButton = document.querySelector(".custom-button");



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
    
            
        
    }
    
    // ask new user for his/her name let the server know 
    const name = prompt('Enter Your Name To Join');
    socket.emit('new-user-joined', name);
    
    // if a new user joins, let the server know
    socket.on('user-joined', name  =>{
        append(`<strong>${name}</strong> joined the chat`, 'right' )
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

// click event of img and video
customButton.addEventListener("click", function() {
    fileInput.click();
  });

  fileInput.addEventListener("change", function() {
    // Get the selected file
    const file = fileInput.files[0];
      // Send the file using socket.io
  socket.emit("send-file", file);
});

// Listen for the "file-data" event
socket.on("file-data", function(file) {
    // Create a URL for the file
    const url = URL.createObjectURL;
    
    // Check the file type
    if (file && file.type && file.type.startsWith("image/")) {
      // Display the image
      const image = document.createElement("img");
      image.src = url;
      document.body.appendChild(image);
    } else if (file && file.type && file.type.startsWith("video/")) {
      // Display the video
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      video.autoplay = true;
      document.body.appendChild(video);
    }
  })
  


// audio of joining and leaving the chat
socket.on('user-joined', () => {
    audio.play();
  });
  
  socket.on('left', () => {
    audio2.play();
  });
 
 