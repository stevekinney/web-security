import { createAlert } from './alert.js';
import { enhanceForm } from './form.js';

const form = document.getElementById('update-product') as HTMLFormElement;
const productPrice = document.getElementById('product-price') as HTMLDivElement;

enhanceForm(form, {
  success: ({ data }) => {
    createAlert('Product updated successfully!');
    productPrice.textContent = parseFloat(String(data.price)).toFixed(2);
  },
  error: (error) => {
    createAlert(`Error submitting form: ${error}`);
  },
});
