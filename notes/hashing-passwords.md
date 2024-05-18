# Salting and Hashing Passwords

We're going to use [`bcrypt`](npm.im/bcrypt)

Upon registration, we're going to hash the password. We're going to use a randomly generated `salt` to further secure the password.

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

Now, we can't ever un-hash that password, but we _can_ take some user input, hash that input, and see if we get the same thing out the other end.

```js
bcrypt.compare(password, user.password);
```
