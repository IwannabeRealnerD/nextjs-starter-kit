const path = require('path')
 
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')} -c lint-rules/commit-rule.json`
 
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand,      "bash -c tsc --noEmit --pretty"
],
}