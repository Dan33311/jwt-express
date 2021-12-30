const { Router } = require("express");
const { jwtSign, jwtVerify } = require('../lib/jwt')
const userDB = require('../constants/users')
const router = Router()
const { join } = require('path')

router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, "../../public/index.html"))
})

/**
 * Devuelve el token JWT si el usuario y la contraseña son correctos. En caso contrario, devuelve un 401 (Unathorized)
 */
router.post('/login', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body

  const userFound = userDB.find(user => user.email === email)

  if (userFound && userFound.password === password){
    try {
      const token = await jwtSign(
        { id: userFound.id },
        { algorithm: 'HS256', expiresIn: '1d' }
      )
      return res.send({ token })
    }
    catch (err) {
      console.log(err);
      return res.status(500).send()
    }
  }

  return res.status(401).send()
})


module.exports = router
