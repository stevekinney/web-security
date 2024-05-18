# Cross-Site Scripting

XSS occurs when an attacker is able to inject malicious scripts into content from an untrusted source, typically involving transferring nefarious scripts to breach the web application's security. Here's the complete implementation of our sample vulnerable application.

This app serves a form to submit comments that are stored in an SQLite database. However, the comments are stored and then rendered directly into the HTML without any kind of sanitization, leaving it open to XSS attacks.

## Steps to Exploit

1. Input a comment containing a script tag, such as `<script>alert('XSS');</script>`.
2. Submit the form and observe the script execution.

## Remediation: Fixing the Vulnerability

1. **Sanitize the Input**: It is crucial to sanitize user inputs to prevent script injection. Using libraries such as DOMPurify or leveraging template engines that automatically escape output can mitigate XSS risks.
2. **Use a template engine with auto-escaping features.**

Something like this should work, right?

```javascript
const safeComments = comments.map((comment) => {
  return {
    content: comment.content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;'),
  };
});
```

## Further Reading

- MDN: [Cross-Site Scripting (XSS)](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)
- Portswigger: [Cross-site scripting (XSS)](https://portswigger.net/web-security/cross-site-scripting)
- OWASP: [Cross-site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
