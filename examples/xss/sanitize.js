/**
 * Sanitize content to prevent XSS attacks. Maybe.
 * @param {string} content
 * @returns
 */
export const sanitize = (content) =>
  content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
