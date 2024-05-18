import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('user-profile-form')
export class UserProfileForm extends LitElement {
  @property({ type: String }) username: string = '';
  @property({ type: String }) photograph: string = '';
  @property({ type: String }) biography: string = '';

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<form action="/account" method="post">
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value="${this.username}"
          required
        />
      </div>

      <div>
        <label for="photograph">Photograph URL</label>
        <input
          type="url"
          id="photograph"
          name="photograph"
          placeholder="https://"
          value="${this.photograph}"
        />
      </div>

      <div>
        <label for="biography">Biography</label>
        <input
          type="text"
          id="biography"
          name="biography"
          placeholder="Tell us a little about yourself."
          value="${this.biography}"
        />
      </div>

      <input type="hidden" name="_method" value="patch" />
      <button type="submit">Update</button>
    </form>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'user-profile-form': UserProfileForm;
  }
}
