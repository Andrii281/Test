const { execFileSync } = require('child_process');

const exFile = execFileSync('git',['rev-parse', '--abbrev-ref', 'HEAD']).toString().trim();

console.dir(exFile)

throw new Error('asdasdsa')