const pool = require('../../db');

module.exports = {
  get: (req, res) => {
    const queryString = 'SELECT * FROM classes'
    pool.query(queryString)
      .then((results) => {
        res.status(200).send(results.rows)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  }
}