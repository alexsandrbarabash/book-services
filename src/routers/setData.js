/* eslint-disable no-console */
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { AuthMiddleware } = require('../middleware');

const router = express.Router();

router.post('/', AuthMiddleware('body'), async (req, res) => {
  try {
    const db = await new sqlite3.Database('./db/library.db');

    const { likeGeners, token } = req.body;
    let value = '';
    likeGeners.forEach((item) => {
      value += `(${token}, ${item}), `;
    });

    await db.run(
      `INSERT INTO gener_user (user_id, gener_id) VALUES ${value.slice(
        0,
        -2,
      )};`,
      [],
      (err) => {
        if (err) {
          console.log(err);
        }
        res.send('Ok');
      },
    );

    db.close();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'something bad' });
  }
});

router.post('/LIKE', AuthMiddleware('body'), async (req, res) => {
  try {
    const { idBook, token } = req.body;
    const db = await new sqlite3.Database('./db/library.db');
    await db.run(
      `INSERT INTO user_book (user_id, book_id) VALUES (?, ?);`,
      [token, idBook],
      (err) => {
        if (err) {
          res.status(500).json({ message: 'something bad' });
        }
        res.status(200).send('Ok');
      },
    );
    db.close();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'something bad' });
  }
});

router.post('/DISLIKE', AuthMiddleware('body'), async (req, res) => {
  try {
    const { idBook, token } = req.body;
    const db = await new sqlite3.Database('./db/library.db');
    await db.run(
      `DELETE FROM user_book WHERE user_id=? AND book_id=?;`,
      [token, idBook],
      (err) => {
        if (err) {
          res.status(500).json({ message: 'something bad' });
        } else {
          res.status(200).send('Ok');
        }
      },
    );
    db.close();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'something bad' });
  }
});

// router.post(
//   '/NAME',
//   AuthMiddleware('body'),
//   [body('name').isLength({ max: 32 })],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: 'Invalid login details',
//         });
//       }
//
//       const { name, token } = req.body;
//       const db = await new sqlite3.Database('./db/library.db');
//       await db.run(
//         `UPDATE users SET name=? WHERE id=?;`,
//         [name, token],
//         (err) => {
//           if (err) {
//             res.status(500).json({ message: 'something bad' });
//           } else {
//             res.status(200).send('Ok');
//           }
//         },
//       );
//       db.close();
//     } catch (e) {
//       console.log(e);
//       res.status(500).json({ message: 'something bad' });
//     }
//   },
// );
//
// router.post('/avatar', ,async (req, res) => {
//   try {
//     const { avatar, token } = req.body;
//     const db = await new sqlite3.Database('./db/library.db');
//     await db.run(
//       `UPDATE users SET avatar=? WHERE id=?;`,
//       [avatar, token],
//       (err) => {
//         if (err) {
//           res.status(500).json({ message: 'something bad' });
//         } else {
//           res.status(200).send('Ok');
//         }
//       },
//     );
//     db.close();
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: 'something bad' });
//   }
// });

module.exports = router;
