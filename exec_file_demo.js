const { execFileSync } = require('child_process');

const exFile = execFileSync('git',['commit', '-m', 'qweqweqw']).toString().trim();

console.dir(exFile)