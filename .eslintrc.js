const merge = require('lodash/merge')

const eslintConfig = merge(require('./.eslintrc.base.js'), {
  rules: {},
})

module.exports = eslintConfig
