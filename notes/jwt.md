Let's assume we're using the [jsonwebtoken](npm.im/jsonwebtoken) library.

We can mint a JWT with any data we want.

```js
const secret = process.env.JWT_SECRET;

const token = jwt.sign({ username: user.username }, secret, {
  algorithm: 'HS256',
});
```

And we can also decode it.

```js
const { username } = jwt.verify(token, secret);
```

But, we want to make sure we're specific about the algorithm that we want to use. Otherwise, someone can set us a token with the `none` algorithm.

```js
const { username } = jwt.verify(token, secret, { algorithms: ['HS256'] });
```
