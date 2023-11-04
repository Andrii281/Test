const { execFileSync } = require('child_process');

const exFile = execFileSync('git add .', (error, stdout, stderr) => {
  if (error) {
      console.error(`exec error: ${error}`);
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
}).toString().trim();

console.dir(exFile)