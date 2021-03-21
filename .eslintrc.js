const merge = require('lodash/merge')

const prettierConfig = require('./conf/prettier.config')

const eslintConfig = merge(require('./conf/.eslintrc.base.js'), {
  rules: {
    'prettier/prettier': ['error', prettierConfig],
  },
})

module.exports = eslintConfig
