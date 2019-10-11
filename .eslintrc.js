const merge = require('lodash/merge')

const prettierConfig = require('./prettier.config')

const eslintConfig = merge(
  require('./.eslintrc.base.js'),
  {
    'rules': {
      'prettier/prettier': ['error', prettierConfig],
    },
  },
)

module.exports = eslintConfig
