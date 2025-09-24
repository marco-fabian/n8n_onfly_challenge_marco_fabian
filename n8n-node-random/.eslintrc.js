module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',         // Desabilita para usar a regra do TypeScript
    '@typescript-eslint/no-unused-vars': 'warn',  // Usa a regra do TypeScript
    'no-console': 'off',             // Permite console.log
    'prefer-const': 'error',         // Força const quando possível
    'no-var': 'error',               // Proíbe var
    'eqeqeq': 'error',               // Força === e !==
    'no-trailing-spaces': 'error',   // Remove espaços no final
  },
};