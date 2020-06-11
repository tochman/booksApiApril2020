const models = require('../models')

const booksSerializer = {
  index() {
    return {
      include: [
        {
          model: models.Author,
          as: 'author',
          attributes: { exclude: ['createdAt', 'updatedAt']}
        }
      ],
      attributes: ['id', 'title'],
    }
  }
}

module.exports = booksSerializer
const foo = "bar";

let me = "be"