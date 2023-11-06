const { execFileSync } = require('child_process');
const { CI_MERGE_REQUEST_SOURCE_BRANCH_NAME } = process.env;

const BranchName = CI_MERGE_REQUEST_SOURCE_BRANCH_NAME ?? execFileSync('git',['rev-parse', '--abbrev-ref', 'HEAD']).toString().trim();

checkBranchName(BranchName);

function checkBranchName (branchName) {
  if(branchName.match(/main$|develop$/)) {
    process.exit(0);
  }
  if (!branchName.match(/^(PILLP-\d+){1}/)) {
    
    console.error('Branch name must start with PILLP-$(TASK_NUMBER): PILLP-1_project_deploy');
    console.error(`branch name \"${branchName}\" is forbidden`);
    process.exit(1);
  }
  if (!branchName.match(/(_[a-z]+){1,}$/)) {
    console.error(branchName.match(/(_[a-z]+){1,}$/))
    console.error('Body of branch name should be in the snake_case lowercase format: PILLP-1_project_deploy');
    onsole.error(`branch name \"${branchName}\" is forbidden`);
    process.exit(1);
  }
}

module.exports = { checkBranchName }