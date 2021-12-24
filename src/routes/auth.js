const { Router } = require("express");
const { jwtSign, jwtVerify } = require('../lib/jwt')
const router = Router()


router.get('/sign', async (req, res) => {
  try {
    const token = await jwtSign({ id: 'elIdSuperunico' }, { algorithm: 'HS256', expiresIn: '200s' })
    return res.send(token)
    // console.log(token);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send()
  }
})

router.get('/decode', async (req, res) => {
  try {
    const decodedToken = await jwtVerify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVsSWRTdXBlcnVuaWNvIiwiaWF0IjoxNjQwMjgzNzAxLCJleHAiOjE2NDAyODM5MDF9.Egq-Z0RA1I2bkWdsuwQovUTFeOD2fnZmZiRikbHM9dk'
    ) 
    return res.send(decodedToken)
  }
  catch (err) {
    console.log(err);
    return res.status(500).send()
  }
})

module.exports = router
