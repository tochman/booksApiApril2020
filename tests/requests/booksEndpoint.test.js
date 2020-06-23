const app = require('../../app')
const supertest = require('supertest')
const { factory, expect } = require('../test_helper')
const jsonResponse = require('../jsonResponse')

let server, request, response, token

before(done => {
  server = app.listen(done)
  request = supertest.agent(server)
});

after(done => {
  server.close(done)
});

beforeEach(async () => {
  const author = await factory.create('Author',
    { id: 100, name: 'Gabriel', email: 'gabriel@heaven.org', password: 'password' }
  )
  await factory.createMany('Book', 2, [
    { id: 1, title: 'The Bible', authorId: author.id },
    { id: 2, title: 'The Quran', authorId: author.id }
  ])
});

afterEach(async () => {
  await factory.cleanUp()
});

describe('GET /api/v1/books', () => {


  describe('for non authenticated user', () => {
    beforeEach(async () => {
      response = await request.get('/api/v1/books')

    })
    it('should respond with 401', () => {
      expect(response.status).to.equal(401)
    });
  });

  describe.only('for authenticated user', () => {
    beforeEach(async () => {
      await request
        .post('/api/v1/auth/login')
        .send({ email: 'gabriel@heaven.org', password: 'password' })
        .then((response) => {
          token = response.body.token // save the token for future use in the test
        })
        .catch((error) => {
          console.log(error)
        })

      response = await request.get('/api/v1/books').set('Authorization', token)
    })
    it('responds with status 200', () => {
      expect(response.status).to.equal(200)
    });

    it('responds with a collection of books', () => {
      const expectedBody = {
        books:
          [
            { id: 1, title: 'The Bible', author: { name: "Gabriel", email: 'gabriel@heaven.org' } },
            { id: 2, title: 'The Quran', author: { name: "Gabriel", email: 'gabriel@heaven.org' } }
          ]
      }
      expect(jsonResponse(response)).to.equal(JSON.stringify(expectedBody))
    });
  });

});
