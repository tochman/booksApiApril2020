const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

// const Book = require('../../models/book')
const Author = require('../../models/author')

const { factory, expect } = require('../test_helper')

describe('Author', () => {
  const DescribedModel = Author(sequelize, dataTypes)
  const subject = new DescribedModel()

  checkModelName(DescribedModel)('Author')
  checkPropertyExists(subject)('name')

});