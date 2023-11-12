const { execFileSync } = require('child_process');
const { PULL_TITLE, GITHUB_HEAD_REF, GITHUB_EVENT_NAME } = process.env;


console.log("PULL_TITLE: ", PULL_TITLE);
console.log("GITHUB_HEAD_REF: ", GITHUB_HEAD_REF);
console.log("GITHUB_EVENT_NAME: ", GITHUB_EVENT_NAME);
console.log("execFileSync: ",  child_process.execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"]).toString().trim(););

function checkBranchName (branchName) {
  if(branchName.match(/main$|develop$/)) {
    process.exit(0);
  }
  if (!branchName.match(/^(PILLP-\d+){1}/)) {
    
    console.log('Branch name must start with PILLP-$(TASK_NUMBER): PILLP-1_project_deploy');
    process.exit(1);
  }
  if (!branchName.match(/(_[a-z]+){1,}$/)) {
    console.log(branchName.match(/(_[a-z]+){1,}$/))
    console.log('Body of branch name should be in the snake_case lowercase format: PILLP-1_project_deploy');
    process.exit(1);
  }
}

module.exports = { checkBranchName }