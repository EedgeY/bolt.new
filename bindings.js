const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));

const bindings = Object.entries(envConfig)
  .filter(([key, value]) => key && value)
  .map(([key, value]) => `--binding ${key}=${value}`)
  .join(' ');

console.log(bindings);
