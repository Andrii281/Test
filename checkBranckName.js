const { execFileSync } = require('child_process');
const { GITHUB_ACTION_REPOSITORY } = process.env;

const BranchName = GITHUB_ACTION_REPOSITORY ?? execFileSync('git',['rev-parse', '--abbrev-ref', 'HEAD']).toString().trim();
console.log("CI_MERGE_REQUEST_SOURCE_BRANCH_NAME: \n", GITHUB_ACTION_REPOSITORY)
console.log("execFileSync: \n", execFileSync('git',['rev-parse', '--abbrev-ref', 'HEAD']).toString().trim())

checkBranchName(BranchName);

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