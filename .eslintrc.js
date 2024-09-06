module.exports = {
    parser: '@babel/eslint-parser',
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'next',
      'next/core-web-vitals'
    ],
    rules: {
      // Your custom rules
    },
    parserOptions: {
      requireConfigFile: false,
    },
  };
  