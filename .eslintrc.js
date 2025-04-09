path = require('path');

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'react/require-default-props': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: ['front/**/*', 'server/**/*', '**/*.stories.@(js|jsx|ts|tsx)', 'webpack.config.js'],
      },
    ],
  },
  overrides: [
    {
      files: ['server/**/*'],
      rules: {
        'no-console': 0,
      },
    },
    {
      files: ['*.js', '**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'test/**/*'],
};
