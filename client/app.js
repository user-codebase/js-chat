const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');

const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

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

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
}

addMessageForm.addEventListener('submit', sendMessage);

function sendMessage(event) {
  event.preventDefault();

  const value = messageContentInput.value.trim();

  if (!value) {
    alert('Please enter a message');
    return;
  }

  addMessage(userName, value);

  messageContentInput.value = '';
}

function addMessage(author, content) {
  const message = document.createElement('li');

  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) {
    message.classList.add('message--self');
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