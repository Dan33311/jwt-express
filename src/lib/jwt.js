const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY || 'default_secret_key'


const jwtSign = (payload, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,              //user ID
      privateKey,
      options,
      (err, token) => {
        if(err) reject(err)
        else resolve(token)
      }
    )
  })
}

const jwtVerify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      privateKey,
      (err, decoded) => {
        if (err) reject(err)
        else resolve(decoded)  
      }
    )
  })
}


module.exports = { 
  jwtSign,
  jwtVerify
}