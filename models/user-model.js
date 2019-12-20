const db = require("../database/dbConfig");
module.exports = {
  find,
  findById,
  add
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

function findById(id) {
  return db("users")
    .select("*")
    .where({ id })
    .first();
}
