const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATEKEY

const jwtSign = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: userId },
      privateKey,
      { algorithm: 'HS256', expiresIn: "20s" },
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