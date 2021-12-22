require('dotenv').config()
const express = require('express')
const { jwtSign, jwtVerify } = require('./jwt')
// const { signRoute, verifyRoute } = require('./routes')
const signRoute = require('./routes')


const app = express()
const port = process.env.PORT || 3000


app.use('/', signRoute)


// verify token
app.get('/decode', async (req, res) => {
  try {
    const decodedToken = await jwtVerify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVsaWRzdXBlcnVuaWNvIiwiaWF0IjoxNjQwMjA3MDQ5fQ.9iXKt_xIQjQ-yset7IQSkbaKF1va6U0osbO4Kh65hv0'
    ) 
    return res.send(decodedToken)
  }
  catch (err) {
    console.log(err);
    return res.status(500).send()
  }
})

// app.use('/', verifyRoute)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


