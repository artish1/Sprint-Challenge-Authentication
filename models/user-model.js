const db = require("../database/dbConfig");
module.exports = {
  find,
  findById,
  add,
  getUserByUsername
};

function find() {
  return db("users");
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function getUserByUsername(username) {
  return db("users")
    .select("id", "username")
    .where({ username })
    .first();
}

function findById(id) {
  return db("users")
    .select("*")
    .where({ id })
    .first();
}
