if (window.opener) {
  window.opener.postMessage(
    {
      message: 'I agree to the terms of service.',
      participant: 'customer',
    },
    '*'
  );

  window.opener.location.href = 'http://localhost:4009/chat';
}
