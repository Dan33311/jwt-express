const express = require("express");
const { jwtSign } = require('./jwt')

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

module.exports = router