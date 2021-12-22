const express = require("express");
const { jwtSign, jwtVerify } = require('./jwt')

const router = express.Router()

router.get('/sign', async (req, res) => {
  try {
    const token = await jwtSign('elidsuperunico')
    return res.send(token)
    // console.log(token);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send()
  }
})

// const verifyRoute = router.get('/decode', async (req, res) => {
//   try {
//     const decodedToken = await jwtVerify(
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVsaWRzdXBlcnVuaWNvIiwiaWF0IjoxNjQwMjA3MDQ5fQ.9iXKt_xIQjQ-yset7IQSkbaKF1va6U0osbO4Kh65hv0'
//     ) 
//     return res.send(decodedToken)
//   }
//   catch (err) {
//     console.log(err);
//     return res.status(500).send()
//   }
// })

module.exports = router