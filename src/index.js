require('dotenv').config()
const express = require('express')
const jwtRoutes = require('./routes/auth')
const port = process.env.PORT || 3000
const app = express()



app.use(express.json()) // Middleware
app.use('/auth', jwtRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


