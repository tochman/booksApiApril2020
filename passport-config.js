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
        .then(async user => {
          //success, user is found but let's check the password
          if ( user.validatePassword(payload.password) ) {
            return done(null, {
              id: user.id,
              name: user.name,
              email: user.email
            })
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        })
        .catch(error => {
          // failure, user is NOT found
          console.error(error)
          return done(null, false, { message: 'Wrong username or email' })
        })
    })
  )
}
