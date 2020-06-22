const { Strategy, ExtractJwt } = require('passport-jwt')
const salt = 'thisismysecretstringthelogngerthebetter'
const models = require('./models')
const passport = require('passport')
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // need to add token to header in tests
  secretOrKey: salt
}

module.exports = (passport) => {
  passport.use(
    new Strategy(options, (payload, done) => {
      models.User.findOne({ where: { email: payload.email } })
        .then(user => {
          //success, user is found
          return done(null, {
            id: user.id,
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
