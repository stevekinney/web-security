const participantInput = document.getElementById(
  'participant'
) as HTMLInputElement;
const messageInput = document.getElementById('message') as HTMLInputElement;
const iframe = document.getElementById('victim') as HTMLIFrameElement;
const form = document.getElementById('payload') as HTMLFormElement;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const participant = participantInput.value;
  const message = messageInput.value;

  iframe.contentWindow?.postMessage(
    { participant, message },
    'http://localhost:5555'
  );
});
