import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  {
    ignores: ['dist'],
  },

  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },

    plugins: {
      '@stylistic': stylistic,
    },

    rules: {
      ...stylistic.configs.recommended.rules,
    },
  },
]
