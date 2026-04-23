const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');

const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

const socket = io();

socket.on('message', ({ author, content }) => {
  addMessage(author, content);
});

socket.on('newUser', (name) => {
  addMessage('Chat Bot', `${name} has joined the conversation!`);
});

socket.on('removeUser', (name) => {
  addMessage('Chat Bot', `${name} has left the conversation... :(`);
});

let userName = '';

loginForm.addEventListener('submit', login);

function login(event) {
  event.preventDefault();

  const value = userNameInput.value.trim();

  if (!value) {
    alert('Please enter your username');
    return;
  }

  userName = value;

  socket.emit('join', userName);

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
}

addMessageForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }

}

function addMessage(author, content) {
  const message = document.createElement('li');

  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) {
    message.classList.add('message--self');
  }

  if (author === 'Chat Bot') {
    message.classList.add('message--system');
  }

  message.innerHTML = `
    <h3 class="message__author">
      ${author === userName ? 'You' : author}
    </h3>
    <div class="message__content">
      ${content}
    </div>
  `;

  messagesList.appendChild(message);
}