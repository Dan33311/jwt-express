const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'default_secret_key'


const jwtSign = (payload, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,              //user ID
      jwtSecret,
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
      jwtSecret,
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