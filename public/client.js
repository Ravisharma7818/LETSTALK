const socket = io()

let namee

let textArea = document.querySelector('#textArea')
let messagearea = document.querySelector('.messageArea')

do {
  namee = prompt('Plz Enter Your Name : ')
} while (!namee)

textArea.addEventListener('keyup', evt => {
  if (evt.key === 'Enter') {
    sendMessage(evt.target.value)
  }
})

function submit () {
  sendMessage(textArea.value)
  console.log('Its Working')
}

function sendMessage (message) {
  let msg = {
    user: namee,
    message: message.trim()
  }

  // Apppend Message
  
  if(msg.message =='')
  {
      alert('Please enter a message')
  }
  else{
    appendMessage(msg, 'outgoing')
    textArea.value = ''
    scrollToBottom()
  console.log(msg)

  socket.emit('message', msg)
  }
  
  
  
 
  
}

function appendMessage (msg, type) {
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, 'message')

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
  mainDiv.innerHTML = markup

  messagearea.appendChild(mainDiv)
}

// Recieve Message

socket.on('message', msg => {
  console.log(msg)
  appendMessage(msg, 'incoming')
  scrollToBottom()
})

function scrollToBottom () {
  messagearea.scrollTop = messagearea.scrollHeight
}
