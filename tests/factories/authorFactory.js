module.exports = (factory, Models) => {
  factory.define('Author', Models.Author, {
    name: 'BarFoo',
    email: 'bar-foo@mail.com',
    password: 'whatever',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}