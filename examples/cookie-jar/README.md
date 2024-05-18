# Cookie Vulnerabilities

This application is susceptible to multiple cookie-related vulnerabilities, including **Cookie Manipulation** and **Session Hijacking**. Fun times, right? The key vulnerability here is that the server is relying on the user's cookie (`username`) to authenticate the user without proper validation or security.

There are two users loaded into the database for starters.

| username    | password       |
| ----------- | -------------- |
| bobbytables | papayawhip     |
| admin       | blanchedalmond |

We're going to start our journey as `bobbytables`.

### How the Attack Works

1. **Cookie Manipulation:** Since the cookie is stored on the client side, a malicious user can modify the `username` cookie to impersonate another user.
2. **Session Hijacking:** If the cookies are not secured (e.g., `HttpOnly`, `Secure` flags are missing), an attacker can steal them via various attacks like XSS (Cross-Site Scripting).

## Steps to Fix and Secure the Application

1. **Use Secure Cookies:** Set the `HttpOnly`, `Secure`, and `SameSite` attributes to protect the cookies from being accessed through JavaScript and transmitted over non-HTTPS connections.
2. **Use Session IDs over Cookies:** Instead of storing sensitive data like usernames directly in cookies, store a session identifier and manage session data on the server side.
3. **Secure Authentication:** Validate cookies and session IDs on the server to prevent impersonation and ensure they are not accessible to client-side scripts.

Let's modify the application to address these issues.

## Remediating the Cookie Hijacking

Let's start by removing the vulnerability that allowed JavaScript code running the browser to read the cookie. We'll do this by setting `httpOnly` to true.

```js
res.cookie('username', username, { httpOnly: true });
```

The `username` cookie is no longer accessible from JavaScript.

## Using a Cookie Secret

We can sign our cookies in order to make sure thay haven't been tampered with.

1. **Setting a Cookie**:
   - When you set a cookie using `res.cookie`, the cookie value is signed using the secret.
   - The signature is created by hashing the cookie value along with the secret key.
   - The signed cookie is then sent to the client in the format: `cookieValue.sig`, where `.sig` is the signature.
2. **Verifying a Cookie**:
   - When a signed cookie is sent back by the client in a subsequent request, `cookieParser` uses the secret to verify the signature.
   - It separates the cookie value from the signature and hashes the cookie value again with the secret.
   - If the computed hash matches the signature, the cookie is considered valid and untampered. Otherwise, it's rejected.

## Using a Signing Our Cookie

**Nota Bene**: We're about to use a session ID after this section, which may not make signing the cookie the most important thing in the world, but right now is a great time to run through this and get a sense of how it works.

We sign our cookie with a secret. Now, this is a terrible secret, but it'll work for now.

```js
const COOKIE_SECRET = 'your-secret-key';
```

You're wonder what would make the secret better? Well, like not hard coding it would be a good start. We can store it as an environent variable or we could use a fancy service to securely store our secrets.

Anyway, next we tell Express to use the `cookie-parser` middleware.

```js
app.use(cookieParser(COOKIE_SECRET));
```

## Using a Session ID

Even better, we can totally separate the concept of a user's identify from the session itself. This means a few things:

1. At no point are we ever sending over sensitive data like their email address and password—encrypted or otherwise.
2. It means that we can allow the user to terminate other sessions might exist.
3. It means we can totally invalidate all sessions if we're ever compromised and re-secure our hashing.

Anyway, let's generate a session ID.

```js
function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}
```

Alternatively, we can use [`uuid`](https://npm.im/uuid).

```js
import { v4 as uuid } from 'uuid';

function generateSessionId() {
  return uuid();
}
```

**Fun Fact**: `uuid` uses `crypto` under the hood. If you're really concerned about making the Right Choice™, maybe run some performance tests and see which work better.

You can argue that we don't need to wrap that in `generateSessionId()` and I would agree with you, but I'm trying to make a point that they're the same basic idea.

Moving on. Let's store that session into the database.

```js
await db.run('INSERT INTO sessions (id, username) VALUES (?, ?)', [
  sessionId,
  username,
]);
```

Next, we'll set the cookie with our session ID.

```js
res.cookie('sessionId', sessionId, {
  httpOnly: true,
  sameSite: 'strict',
  signed: true,
});
```

And we'll redirect them to the `/profile` route just like before. This time, we'll look up the user by their `sessionId`.

```js
app.get('/profile', async (req, res) => {
  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    return res.redirect('/login?error=Please login to view your profile.');
  }

  const session = await db.get('SELECT * FROM sessions WHERE id = ?', [
    sessionId,
  ]);

  const username = session?.username;

  if (username) {
    res.render('profile', { username });
  } else {
    return res.redirect('/login?error=Please login to view your profile.');
  }
});
```

## Explanation of the Fixes

1. **Session IDs**: Instead of storing username in the cookie, we store a session ID and maintain session data on the server side.
2. **HTTP-Only Cookies**: Set `HttpOnly` flag to prevent cookies from being accessed via JavaScript.
3. **SameSite Attribute**: Mitigate certain kinds of CSRF attacks by setting the `SameSite` attribute.

## Next Steps

We could make this example even more secure by implementing the following:

1. **Using HTTPS**: Ensure your server is running over HTTPS to encrypt the data transmitted between the client and server.
2. **Secure Cookies**: Ensure cookies are only sent over HTTPS by setting the `Secure` flag.
3. **Limit Session Age**: Set a `maxAge` on the session token and remove old sessions from the database.

We could choose to set the cookie to secure in production where we're likely to be using HTTPs.

```js
res.cookie('sessionId', sessionId, {
  // Evaluates to `true` in production.
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'strict',
  signed: true,
  maxAge: 360000, // An hour.
});
```

## Additional Reading and Resources

- [Mozilla Developer Network on HttpOnly Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#httponly_cookie)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [PortSwigger: Cookie properties](https://portswigger.net/web-security/cookies/properties)
