require('dotenv').config()
const express = require('express')
const { jwtSign } = require('./jwt')
const signRoute = require('./routes')

const app = express()
const port = process.env.PORT || 3000


app.use('/', signRoute)


app.get('/decode', function (req, res) {
  
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


