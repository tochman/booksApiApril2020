const models = require('../models')

const booksSerializer = {
  index() {
    return {
      include: [
        {
          model: models.Author,
          as: 'author',
          attributes: { exclude: ['id','createdAt', 'updatedAt', 'password']}
        }
      ],
      attributes: ['id', 'title'],
    }
  }
}

module.exports = booksSerializer