module.exports = (factory, Models) => {
  factory.define('Book', Models.Book, {
    title: 'FooBar',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: factory.assoc('Author', 'id')
  })
}