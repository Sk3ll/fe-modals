module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/no-unused-prop-types': 'off',
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'import/no-cycle': 0,
    'react/prop-types': 0,
    'no-console': 0,
  },
};
