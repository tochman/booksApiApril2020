module.exports = (factory, Models) => {
  factory.define('Author', Models.Author, {
    name: 'BarFoo',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}