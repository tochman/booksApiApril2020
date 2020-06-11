'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'You need to set a title!' }
      }
    }
  }, {});
  Book.associate = (models) => {
    // associations can be defined here
    Book.belongsTo(models.Author, { foreignKey: 'authorId', as: 'author' })
  };
  return Book;
};