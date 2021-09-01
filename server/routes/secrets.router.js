const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user);

  if(req.user.clearance_level <= 10) {
    let queryText=
    `
    SELECT * FROM secret
    WHERE secrecy_level <= 10
    `
    pool
    .query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  } else {
    let queryText=
    `
    SELECT * FROM "secret"
    `
    pool
    .query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  }
});

module.exports = router;
