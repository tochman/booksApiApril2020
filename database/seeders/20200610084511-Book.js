'use strict';

const models = require('../../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const thomas = await models.Author.create({ name: 'Thomas' })
    // const adi = await models.Author.create({ name: 'Adi' })
    await queryInterface.bulkInsert(
      'Authors',
      [
        {
          name: 'Pauline rules the world',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Steve is the best beer drinker. Anarchy',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {}
    )

    // const authors = await queryInterface.sequelize.query(
    //   `SELECT id FROM "Authors";`
    // )

    // const authorsRows = authors[0]
    // console.table(authorsRows[0])
    const authors = await models.Author.findAll()
    await queryInterface.bulkInsert(
      'Books',
      [
        // {
        //   title: 'Learn NodeJS with Thomas',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   authorId: await models.Author.findOne({ where: { name: 'Pauline' } }).id
        // },
        {
          title: 'Learn Sequelize with Adi',
          createdAt: new Date(),
          updatedAt: new Date(),
          authorId: authors[0].id
        }
      ], {}
    )

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {})
    await queryInterface.bulkDelete('Authors', null, {})
  }
};
