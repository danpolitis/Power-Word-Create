const pool = require('../../db');

module.exports = {
  post: (req, res) => {
    const params = [req.body.name, req.body.race]
    const queryString = '\
    WITH new_character as ( \
      INSERT INTO characters (name, race) VALUES ($1, $2) \
      returning id \
    )  \
    SELECT id FROM new_character; '
    pool.query(queryString, params)
      .then((results) => {
        res.status(201).send(results)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send(err)
      })
  },

  updateClass: (req, res) => {
    const params = [req.body.classObject, req.body.currentChar]
    const queryString = 'UPDATE characters \
    SET class = $1 \
    WHERE id = $2'
    pool.query(queryString, params)
      .then((results) => {
        res.status(201).send(results)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send(err)
      })
  },

  get: (req, res) => {
    const params = [req.query.id]
    const queryString = 'SELECT * FROM characters WHERE id = $1'
    pool.query(queryString, params)
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      console.log(err)
      res.status(404).send(err)
    })
  }
}