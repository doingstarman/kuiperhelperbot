module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json', './apps/*/tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['**/.next', '**/dist', 'node_modules'],
  overrides: [
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      extends: ['next/core-web-vitals'],
      parserOptions: {
        project: ['./apps/web/tsconfig.json'],
      },
      env: {
        browser: true,
      },
    },
    {
      files: ['apps/bot/**/*.ts'],
      parserOptions: {
        project: ['./apps/bot/tsconfig.json'],
      },
      env: {
        node: true,
      },
    },
  ],
};
