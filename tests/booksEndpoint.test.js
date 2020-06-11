const app = require('../app')
const supertest = require('supertest')
const { factory, expect } = require('./test_helper')
const jsonResponse = require('./jsonResponse')

let server, request, response

before(done => {
  server = app.listen(done)
  request = supertest.agent(server)
});

after(done => {
  server.close(done)
});

beforeEach(async () => {
  const author = await factory.create('Author',
    { id: 100, name: 'Gabriel' }
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

  beforeEach(async () => {
    response = await request.get('/api/v1/books')
  })

  it('responds with status 200', () => {
    expect(response.status).to.equal(200)
  });

  it('responds with a collection of books', () => {
    const expectedBody = {
      books:
        [
          { id: 1, title: 'The Bible', author: { name: "Gabriel" } },
          { id: 2, title: 'The Quran', author: { name: "Gabriel" } }
        ]
    }
    expect(jsonResponse(response)).to.equal(JSON.stringify(expectedBody))
  });
});
