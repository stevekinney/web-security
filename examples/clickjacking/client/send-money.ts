const sendMoneyButton = document.getElementById(
  'send-money'
) as HTMLButtonElement;

sendMoneyButton.addEventListener('click', async () => {
  const amount = sendMoneyButton.dataset.amount;
  const recipient = sendMoneyButton.dataset.recipient;

  alert(`Sending ${amount} to ${recipient}!`);
});

if (window.self !== window.top) {
  window.top.location = window.self.location;
}
