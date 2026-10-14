// Quote every path so checkouts whose directory contains spaces still work.
const quote = (filenames) => filenames.map((file) => `"${file}"`).join(' ')

module.exports = {
  // Lint & Prettify TS and JS files
  '*.{js,jsx,ts,tsx}': (filenames) => [
    `prettier --write ${quote(filenames)}`,
    `eslint --fix ${quote(filenames)}`
  ]
}
