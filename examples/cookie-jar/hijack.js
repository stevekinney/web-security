const hijackCookieButton = document.getElementById('hijack-cookie');
const hijackCookieResult = document.getElementById('hijack-cookie-result');

hijackCookieButton?.addEventListener('click', () => {
  if (!hijackCookieResult) return;

  if (!document.cookie) {
    hijackCookieResult.textContent = 'No cookie to hijack.';
    return;
  }
  hijackCookieResult.textContent = `${document.cookie}`;
});
