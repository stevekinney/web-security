const form = document.getElementById('chat-message') as HTMLFormElement;
const input = document.getElementById('message') as HTMLInputElement;
const button = document.getElementById('send-message') as HTMLButtonElement;
const messages = document.getElementById('messages') as HTMLDivElement;

localStorage.setItem('secret-storage', "It's a secret to everybody.");

window.addEventListener('message', (event) => {
  if (event.origin !== 'http://localhost:4108') return;

  console.log(event);
  addMessage(event.data.message, event.data.participant);
});

const addMessage = (message: string, participant: 'customer' | 'support') => {
  if (!message) return;
  const messageElement = document.createElement('div');
  messageElement.className = `message ${participant}`;
  messageElement.innerHTML = `<p>${message}</p>`;
  messages.appendChild(messageElement);
  window.scrollTo(0, document.body.scrollHeight);
};

input.addEventListener('keyup', () => {
  if (input.value) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  addMessage(input.value, 'customer');

  input.value = '';
  button.disabled = true;
});
