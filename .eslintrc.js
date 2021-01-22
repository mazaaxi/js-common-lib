const merge = require('lodash/merge')

const prettierConfig = require('./conf/prettier.config')

const eslintConfig = merge(
  require('./conf/.eslintrc.base.js'),
  {
    'rules': {
      'prettier/prettier': ['error', prettierConfig],
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            'Function': false,
          },
        },
      ],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': ['error'],
    },
  },
)

module.exports = eslintConfig
