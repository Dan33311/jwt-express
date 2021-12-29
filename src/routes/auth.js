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

/**
 * Devuelve los datos del usuario a partir del token JWT que se obtiene de los Headers.
 */
router.get("/profile", async (req, res) => {
  let token

  if (req.headers.authorization)
    token = req.headers.authorization.split(" ")[1]

  if (token) {
    try {
      const { id } = await jwtVerifyAsync(token)

      // Este find sería el equivalente a buscar al usuario en la BD
      const userFound = usersDB.find((user) => user.id === id)

      if (userFound) {
        return res.send(userFound)
      }
      return res.status(401).send()
    } catch (err) {
      console.error(err)
      return res.status(500).send()
    }
  }

  return res.status(401).send()
})


// router.get('/decode', async (req, res) => {
//   try {
//     const decodedToken = await jwtVerify(
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVsSWRTdXBlcnVuaWNvIiwiaWF0IjoxNjQwMjgzNzAxLCJleHAiOjE2NDAyODM5MDF9.Egq-Z0RA1I2bkWdsuwQovUTFeOD2fnZmZiRikbHM9dk'
//     ) 
//     return res.send(decodedToken)
//   }
//   catch (err) {
//     console.log(err);
//     return res.status(500).send()
//   }
// })

module.exports = router
