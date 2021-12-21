const jwt = require('jsonwebtoken');
const PRIVATEKEY = process.env.PRIVATEKEY

const jwtSign = (userId) => {
  return new Promise((resolve, reject) => {

    jwt.sign({ id: userId }, PRIVATEKEY, { algorithm: 'HS256'}, (err, token) => {
      if(err) reject(err)
      else resolve(token)
    })
  })
}

module.exports = { 
  jwtSign
}