/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    browser: true,
    node: true
  },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    './src/.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index']
      }
    ],
    'vue/valid-template-root': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    'no-undef': 'error'
  }
}
