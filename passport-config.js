const { Strategy, ExtractJwt } = require('passport-jwt')
const salt = 'thisismysecretstringthelogngerthebetter'
const models = require('./models')
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // need to add token to header in tests
  secretOrKey: salt
}

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {

      await models.Author.findOne({ where: { email: payload.email } })
        .then(user => {
          //success, user is found
          return done(null, {
            id: user.id,
            name: user.name,
            email: user.email
          })
        })
        .catch(error => {
          // failure, user is NOT found
          console.error(error)
          return done(null, false)
        })
    })
  )
}
