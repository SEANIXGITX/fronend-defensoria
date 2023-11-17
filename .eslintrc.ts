module.exports = {
  extends: ['plugin:vue/vue3-recommended', 'plugin:vue/vue3-essential', '@vue/typescript/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vue/html-indent': ['error', 4], // Sangrado de HTML
    indent: ['error', 4], // Sangrado en general
    quotes: ['error', 'single'], // Comillas simples
    semi: ['error', 'always'], // Punto y coma obligatorio
    'no-console': 'off', // Puedes habilitar o deshabilitar las declaraciones de console
    'no-debugger': 'off', // Puedes habilitar o deshabilitar las declaraciones de debugger
    'vue/setup-compiler-macros': true,
  },
};
