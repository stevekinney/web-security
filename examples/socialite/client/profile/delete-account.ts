import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('delete-account-form')
export class DeleteAccountForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<form action="/account" method="post">
      <input type="hidden" name="_method" value="delete" />
      <button type="submit" class="button-destructive">Delete Account</button>
    </form>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'delete-account-form': DeleteAccountForm;
  }
}
