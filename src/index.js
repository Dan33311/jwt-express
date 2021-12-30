require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const port = process.env.PORT || 3000
const app = express()


app.use(express.json()) // Middleware
app.use("/user", async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const { id } = await jwtVerifyAsync(token);
      req.id = id;
      return next();
    } catch (err) {
      console.error(err);
      return res.status(500).send();
    }
  }
  return res.status(401).send();
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


