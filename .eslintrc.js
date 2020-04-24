// .eslintrc.js
module.exports = {
  env: {
    node: true,
    mocha: true,
    es6: true,
    commonjs: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  rules: {
    curly: [2, 'all'],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': [2, { code: 100, tabWidth: 2, ignoreUrls: true }],
    'prettier/prettier': 'off',
  },
}
