import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type Post = {
  id: number;
  username: string;
  userId: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  editable: boolean;
};

type User = {
  id: number;
  username: string;
  photograph: string;
  biography: string;
  administrator: boolean;
  suspended: boolean;
  createdAt: string;
  updatedAt: string;
};

const canEdit = (user: Partial<User>, post: Post) =>
  user.id === post.userId || user.administrator;

@customElement('socialite-posts')
export class SocialitePosts extends LitElement {
  @property({ type: Array }) posts: Post[] = [];
  @property({ type: Object }) user: Partial<User> = {};

  createRenderRoot() {
    return this;
  }

  render() {
    const posts = this.posts.map(
      (post) =>
        html`<socialite-post
          id=${post.id}
          username=${post.username}
          avatar=${post.avatar}
          content=${post.content}
          created-at=${post.createdAt}
          ?editable=${canEdit(this.user, post)}
        ></socialite-post>`
    );

    const emptyState = html`<p class="py-16 text-2xl font-light text-center">
      No posts yet.
    </p>`;

    return html`
      <div class="flex flex-col gap-4">
        ${posts.length > 0 ? posts : emptyState}
      </div>
    `;
  }
}
