import { createAlert } from './alert.js';
import { enhanceForm } from './form.js';

const form = document.getElementById('profile') as HTMLFormElement;
const currentUserEmail = document.getElementById(
  'current-user-email'
) as HTMLDivElement;

enhanceForm(form, {
  success: ({ data }) => {
    createAlert('Profile updated successfully!');
    currentUserEmail.textContent = String(data.email);
  },
  error: (error) => {
    createAlert(`Error submitting form: ${error}`);
  },
});
