const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { ERROR_MESSAGE } = require('../enums');
const { AuthMiddleware } = require('../middleware');

const router = express.Router();

router.post('/', AuthMiddleware('body'), async (req, res) => {
  try {
    const { token } = req.body;
    const db = await new sqlite3.Database('./db/library.db');
    await db.run(`INSERT INTO users (id) VALUES (?);`, [token], (err) => {
      if (err) {
        return res.status(500).json({ message: ERROR_MESSAGE.ADD_USER_ERROR });
      }
      return res.sendStatus(200);
    });
    db.close();
  } catch (e) {
    res.status(500).json({ message: 'something bad' });
  }
});

module.exports = router;
