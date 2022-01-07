const usersDB = require("../constants/users");

/**
 * Finds an user by ID
 * @param {*} id User ID
 * @returns User or null
 */
const findById = (id) => {
  return usersDB.find((user) => user.id === id) || null;
};

/**
 * Finds an user by email
 * @param {*} email User email
 * @returns User or null
 */
const findByEmail = (email) => {
  return usersDB.find((user) => user.email === email) || null;
};

/**
 * Create an user
 * @param {*} user User
 */
const create = (user) => {
  const existingUserById = findById(user.id);
  if (existingUserById) throw new Error("El id de usuario ya existe");

  const existingUserByEmail = findByEmail(user.email);
  if (existingUserByEmail) throw new Error("El email de usuario ya existe");

  // Validar el resto de restricciones de base de datos del usuario.//#en region
  // Ej. Si es SQL, validar que el user cumpla con el esquema.

  usersDB.push(user);
};

/**
 * Updates an user
 * @param {*} user User
 */
const update = (user) => {
  throw new Error("Not implemented");
};

/**
 * Deletes an user by ID
 * @param {*} id User ID
 */
const deleteById = (id) => {
  throw new Error("Not implemented");
};

module.exports = { findById, findByEmail, create, update, deleteById };