module.exports = {
  env: {
    es6: true,
    jest: true,
  },
  extends: ["prettier", "plugin:jest/recommended"],
  rules: {
    "comma-dangle": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    "implicit-arrow-linebreak": 0,
    "object-curly-newline": 0,
    quotes: ["error", "double"],
    camelcase: 0,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
};
