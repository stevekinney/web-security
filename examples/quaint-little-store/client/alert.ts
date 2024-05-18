/**
 * Creates an alert message that will be displayed at the top of the page.
 */
export const createAlert = (message: string, duration = 3000) => {
  const alertElement = document.createElement('div');

  alertElement.textContent = message;
  alertElement.classList.add('alert');

  document.body.appendChild(alertElement);
  alertElement.style.opacity = '1';

  setTimeout(() => {
    removeAlert(alertElement);
  }, duration);
};

const removeAlert = (alertElement: HTMLDivElement) => {
  alertElement.style.opacity = '0';
  setTimeout(() => {
    alertElement.remove();
  }, 1000);
};
