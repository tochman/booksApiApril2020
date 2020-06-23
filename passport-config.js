const { Strategy, ExtractJwt } = require('passport-jwt')
const salt = 'thisismysecretstringthelogngerthebetter'
const models = require('./models')
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // need to add token to header in tests
  secretOrKey: salt,
}

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await models.Author.findOne({ where: { id: payload.id } })
        .then((user) => {
          return done(null, {
            id: user.id,
            name: user.name,
            email: user.email,
          })
        })
        .catch((error) => {
          console.error(error)
          return done(null, false)
        })
    })
  )
}
