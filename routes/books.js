var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/', (req, res) => {
  const booksCollection = [
    { title: 'The Bible' },
    { title: 'The Quran' }
  ]
  res.json({ books: booksCollection });
});

module.exports = router;
