const { execFileSync } = require('child_process');

const exFile = execFileSync('git',['add', '.']).toString().trim();

console.dir(exFile)