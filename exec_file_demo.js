const { execFileSync } = require('child_process');
const process = require('process');


function foo() {
  const exFile = execFileSync('git',['rev-parse', '--abbrev-ref', 'HEAD']).toString().trim();

  console.dir(exFile)
  
  console.log();
  
  if(exFile.match(/^(PILLP-\d+){1}(_[a-z]+){1,}$/) !== null) {
    console.log('nul')
    process.exit(1)
  }
}

module.exports = { foo }
// console.log(/^(PILLP-\d+)/.exec(exFile))