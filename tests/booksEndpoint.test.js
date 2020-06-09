const app = require('../app')
const supertest = require('supertest')
const expect = require('chai').expect
const jsonResponse = require('./jsonResponse')

let server, request, response

before(done => {
  server = app.listen(done)
  request = supertest.agent(server)
});

after(done => {
  server.close(done)
});

describe('GET /api/v1/books', () => {

  before(async () => {
    response = await request.get('/api/v1/books')
  })

  it('responds with status 200', () => {
    expect(response.status).to.equal(200)
  });

  it('responds with a collection of books', () => {
    const expectedBody = { books: [{ title: 'The Bible' }, { title: 'The Quran' }] }
    expect(jsonResponse(response)).to.equal(JSON.stringify(expectedBody))
  });
});
