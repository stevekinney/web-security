# Clickjacking

Clickjacking is a type of attack where a malicious site tricks users into clicking on something different from what the user perceives. By embedding the target site (e.g., your application) within a transparent `iframe`, the attacker can overlay elements and deceive users into performing unintended actions like revealing information, transferring money, or following links.

## Steps to Fix and Secure the Application

### Use Content Security Policy (CSP)

Add a response header to prevent your site from being embedded in an iframe.

```js
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  next();
});
```

### Use the X-Frame-Options Header

This HTTP header allows you to indicate whether your site can be embedded in a frame, iframe, or object.

```javascript
// Add security headers to prevent Clickjacking
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});
```

### Break Out of Frames

In the event that you _never_ want your site in an `iframe`, you can use this simple client-side check in order to navigate to your site in the top-most frame if it's not currently the top-most frame. Words are hard, let's look at code.

```js
if (window.top != window.self) {
  if (window.top) {
    window.top.location.href = window.location.href;
  }
}
```

**Note**: This code contains some extra checks to keep the TypeScript compiler happy.

## Further Reading

Clickjacking is a severe threat, but it's also pretty easy to circumvent. Using headers like `Content-Security-Policy` and `X-Frame-Options`, you can protect your application. This example guides you through identifying the vulnerability and securing your code, ensuring you maintain a safe application.

- **Mozilla Developer Network**:
  - [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
  - [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) (Obsolete)
- **OWASP**: [Clickjacking](https://owasp.org/www-community/attacks/Clickjacking)
- **Portswigger**: [Clickjacking attacks](https://portswigger.net/web-security/clickjacking)

The CSP `frame-ancestors` directive specifies valid parents that may embed a page using the `frame` tag, and `X-Frame-Options` provides backward compatibility for older browsers.
