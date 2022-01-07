const { Router } = require("express");
const { jwtSign, jwtVerify } = require('../lib/jwt');
const { findByEmail } = require("../repository/user.repository");
const userDB = require('../constants/users');
const router = Router();


/**
 * Devuelve el token JWT si el usuario y la contraseña son correctos. En caso contrario, devuelve un 401 (Unathorized)
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Este find sería el equivalente a buscar al usuario en la BD
  const userFound = userDB.findByEmail(email);

  if (!userFound || userFound.password !== password)
    return res.status(401).send();

  try {
    const token = await jwtSign(
      { id: userFound.id },
      { algorithm: 'HS256', expiresIn: '1d' }
    );
    return res.send({ token });
  }
  catch (err) {
    console.log(err);
    return res.status(500).send();
  };
});

module.exports = router;