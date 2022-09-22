module.exports = {
  trailingComma: 'none',
  tabWidth: 4,
  useTabs: false,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'always',
  printWidth: 120,
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.scss', '*.css', '*.html'],
      options: {
        tabWidth: 2
      }
    }
  ]
}
