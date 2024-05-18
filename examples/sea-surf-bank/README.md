# Cross-Site Request Forgery

Cross-Site Request Forgery (CSRF) is an attack where a malicious website, email, or program causes a user's web browser to perform an unwanted action on a trusted site for which the user is currently authenticated. This can lead to actions such as changing passwords, making purchases, or data modifications without the user's consent.

Here is what a malicious form might look like:

```html
<form action="http://localhost:4007/transfer" method="POST">
  <input type="hidden" name="amount" value="50" />
  <input type="submit" />
</form>
```

## Explaining CSRF

A CSRF attack tricks the victim's browser into sending a request to a vulnerable site, which performs an action on behalf of the user without their intention. This exploits the trust a site has in the browser of a user who is authenticated.

### The Remedy

Let's make a token when we make a session.

```diff
-import crypto from 'crypto';
+import crypto, { randomUUID } from 'crypto';
 import { startServer, createServer } from '#shared';
 import { db } from './database.js';
 import { currentUser } from './middleware.js';
@@ -47,12 +47,13 @@ app.post('/login', async (req, res) => {
   }

   const sessionId = crypto.randomBytes(16).toString('hex');
+  const token = randomUUID();

   try {
-    await db.run(`INSERT INTO sessions (sessionId, userId) VALUES (?, ?)`, [
-      sessionId,
-      user.id,
-    ]);
+    await db.run(
+      `INSERT INTO sessions (sessionId, userId, token) VALUES (?, ?, ?)`,
+      [sessionId, user.id, token]
+    );

     res.cookie('sessionId', sessionId);
     res.redirect('/account');
```

```diff
@@ -70,7 +71,11 @@ app.get('/transfer', (_, res) => {

 app.post('/transfer', async (req, res) => {
   const { user } = res.locals;
-  const { amount, recipient } = req.body;
+  const { amount, recipient, _csrf } = req.body;
+
+  if (!_csrf || _csrf !== res.locals.token) {
+    return res.status(403).send('Unauthorized');
+  }

   try {
     await db.run('UPDATE users SET balance = balance - ? WHERE id = ?', [
```

We'll grab that token from their session.

```diff
@@ -17,7 +17,15 @@ export const currentUser = async (req, res, next) => {
     sessionId
   );

+  const { token } = await db.get(
+    'SELECT token FROM sessions WHERE sessionId = ?',
+    sessionId
+  );
+
+  console.log('token', token);
+
   res.locals.user = user;
+  res.locals.token = token;

   next();
 };
```

We'll hide that token in the server generated form.

```diff
diff --git a/examples/sea-surf-bank/views/account.ejs b/examples/sea-surf-bank/views/account.ejs
index d45fec7..6ab7dd7 100644
--- a/examples/sea-surf-bank/views/account.ejs
+++ b/examples/sea-surf-bank/views/account.ejs
@@ -36,6 +36,7 @@
                 required
               />
             </div>
+            <input type="hidden" name="_csrf" value="<%= token %>" />
             <button type="submit" class="p-2 text-white bg-blue-500 rounded">
               Transfer
             </button>
```

## Resources

- [MDN: Cross-Site Request Forgery (CSRF)](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)
- [OWASP: Cross-Site Request Forgery (CSRF)](https://owasp.org/www-community/attacks/csrf)
- [PortSwigger: CSRF](https://portswigger.net/web-security/csrf)
