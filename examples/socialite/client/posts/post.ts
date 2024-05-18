import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('socialite-post')
export class SocialitePost extends LitElement {
  @property({ type: String }) id: string = '';
  @property({ type: String }) username: string = '';
  @property({ type: String }) avatar: string = '';
  @property({ type: String }) content: string = '';
  @property({ type: String, attribute: 'created-at' }) createdAt: string = '';
  @property({ type: Boolean }) editable: boolean = true;

  private _deletePost() {
    fetch(`/posts/${this.id}`, { method: 'DELETE' }).then((response) => {
      if (response.ok) {
        this.remove();
      }
    });
  }

  protected createRenderRoot() {
    return this;
  }

  render() {
    return html`<section
      id="post-${this.id}"
      class="flex flex-col w-full gap-4 p-4 mx-auto rounded shadow bg-slate-50"
    >
      <div class="flex items-center gap-4">
        <img
          src="${this.avatar ||
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANOSURBVHgB7Zq/T1NRFMe/gFTENpoWkqI0MGAdXOxkMNEFF4yszqw64t+ho7OurjVh6oRBncqCiS2DUqSN8Bqk0EKN6D1NagjJ+9Vz7ruvPz5JJ0rfvZ977rn3nXuH9quHf9HHDKPPGQhAnzMQgD5nIAB9zkAA+pxLCIjy12NUCnVUd05QLZ2gZv3+/7dYYhTRRATJ9HjrM3X7KoJiSPdWuPjxAF9yVViq016JKiGZJ5O4df86dKNNAI342ttdHJ0bab+QiAfLNzCV1hcRWgTks3vIv9+DFBQNmaVJ6EBcwNqbHyrsf0GauflreLh8E9KIrgKf31W0dJ7YUr9Lvy+NmAAK+02V7HRCvy/9DBEBtKRJznkn6Dk1RmK9iIiAjexPBEWz/kflmV1IwRZAo6Fr3ttRKRyjrD4SsAUEOfrn2c7XIAFbQFltb01Q/CQTdSwBVumUtdPjQLmgqp7PhSWgUjiCSaxSA1xYApr1M5hEIvpYAkyFv+TzBxUhMIiMm/VHr8tcWD2QaACHyPgIuLAExFNjMEk8dRlcWAIS02NGp4FEpYiZA0YQn74CE8zcjUEC9vBlliZggrl5mYIpWwCFYTIdXBmboOQbmggggo6ChWcpSCEigKLgzkIcQUDPSQiuPmIp/N7TpMiy5ERcrTr0HElE17DHK7PaNkfU+UfP5UK/jaiA08aZOueLQAfRiVHoOMISOxjZzFmtiq3uV2TpUyK2ACqKflBVWqkipRdo2aUzw5jAdGMJoM6vvvxmpC5AuWbxxSxbQscCLHXOT503WRWirfjiygxrWewoCbZH3nRJjAqjq6++s06KfAsIS+fbtCSo9nQqwbeA3OuS8VrgRag91K5O8CWAToDpjk8YoXZ1cnzuWUCQJ8CdQkfnfpdjzwJonnUD+ey+r+97EkA3vcI27+2gk+Pi+oHn73sSQHO/m/AzVV0FdNPot6H2es0FrgK21oO9/CCF11zgKKDmw2TYoFzgJXIdBWxvHKKb8ZIMXQSYPf/n4uX2iq0A2mN3a/i3oWlA/XDCVoCf291hxnLZutsKqBi6/CSN2z2iYft/7I0IcOuHfQ5ohON9n4u143yRylZArdpEL+BWuHFcBXoBt0h2ENAbU8BtIP8B7UeF3ozMtusAAAAASUVORK5CYII='}"
          alt="${this.username}"
          class="w-8 h-8 rounded-full shadow bg-slate-700"
        />
        <p>${this.username}</p>
      </div>
      <div class="font-serif max-h-40 text-ellipsis">
        <slot>${this.content}</slot>
      </div>
      <footer class="flex items-center justify-between w-full gap-4 text-sm">
        <p class="before:content-['📅'] before:mr-1 select-all">
          ${new Date(this.createdAt).toLocaleString()}
        </p>

        ${this.editable
          ? html`<div class="flex gap-2" @click="${this._deletePost}">
              <button
                class="button-destructive button-small"
                data-action="delete"
              >
                Delete
              </button>
            </div>`
          : nothing}
      </footer>
    </section> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'socialite-post': SocialitePost;
  }
}
