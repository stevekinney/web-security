import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('create-post')
export class CreatePost extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form
        action="/posts"
        method="post"
        class="flex flex-col items-end space-y-2"
      >
        <div class="w-full">
          <label for="new-post-content" class="sr-only">Create Post</label>
          <input
            type="text"
            id="new-post-content"
            name="content"
            placeholder="What did you eat for lunch today?"
            maxlength="140"
            required
          />
        </div>

        <button type="submit" class="lg:max-w-fit button-small">Post</button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'create-post': CreatePost;
  }
}
