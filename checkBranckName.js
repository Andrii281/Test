const child_process = require("child_process");

const { GITHUB_PULL_TITLE, GITHUB_HEAD_REF, GITHUB_EVENT_NAME, GITHUB_REF_NAME, GITHUB_BASE_REF } = process.env;

const branchName = GITHUB_HEAD_REF === "" ? 
  child_process.execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"]).toString().trim() 
  : GITHUB_HEAD_REF;

console.log("branchName: ", branchName, " length: ", branchName.length)
console.log("PULL_TITLE: ", GITHUB_PULL_TITLE);
console.log("GITHUB_HEAD_REF: ", GITHUB_HEAD_REF);
console.log("GITHUB_REF_NAME: ", GITHUB_REF_NAME);
console.log("GITHUB_BASE_REF: ", GITHUB_BASE_REF);
console.log("GITHUB_EVENT_NAME: ", GITHUB_EVENT_NAME);
console.log("execFileSync: ",  child_process.execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"]).toString().trim())
console.log("=======================");
console.log("process.env: ", process.env)

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