const jwt = require('jsonwebtoken')
const salt = 'thisismysecretstringthelogngerthebetter'
const models = require('../models')

const authenticationsController = {
  async login(req, res) {
    const payload = req.body
    if (Object.keys(payload).length > 0) {
      const user = await models.Author.findOne({
        where: { email: payload.email }
      })
      if (user) {
        if (user.validatePassword(payload.password)) {
          const token = jwt.sign(
            {
              id: user.id
            },
            salt,
            { expiresIn: 36000 }
          )
          res.send({ token: `Bearer ${token}` })
        }
        res.status(401).send('Wrong Password')
      }
      res.status(401).send('No User found')
    }
    res.status(401).send('No authentication information found')
  },
}

module.exports = authenticationsController
