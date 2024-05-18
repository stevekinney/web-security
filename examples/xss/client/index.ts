import { sanitize } from '../sanitize.js';

const fetchComments = async (): Promise<{ content: string }[]> => {
  const response = await fetch('/comments');
  const comments = await response.json();
  return comments;
};

const comments = await fetchComments();

const commentsList = document.getElementById('comments');

const renderComments = (comments: { content: string }[]) => {
  comments.forEach((comment) => {
    const element = document.createElement('div');
    element.className = 'comment';
    element.innerHTML = sanitize(comment.content);
    commentsList?.appendChild(element);
  });
};

// Uncomment the following line to render the comments.
// renderComments(comments);
