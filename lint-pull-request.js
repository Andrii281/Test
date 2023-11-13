const { GITHUB_PULL_TITLE, GITHUB_EVENT_NAME } = process.env;

if(GITHUB_EVENT_NAME !== "pull_request") {
  process.exit(0);
}

function executeScript(PullRequstName) {
  const error = lintPullRequest(PullRequstName)
  if(error !== null) {
    console.error(`${error}\nPull request name: ${PullRequstName} is forbidden`);
    process.exit(1);
  }
}

function lintPullRequest(pullRequestToCheck) {
  const startNameCheck = pullRequestToCheck.match(/^(\[PILLP-\d+]){1}/);
  if (startNameCheck === null) {
    return "Name of full reques must start with [PILLP-$(TASK_NUMBER)]"
  }
  const [prefix] = startNameCheck;
  const remainderOfPullRequest = pullRequestToCheck.substring(prefix.length);
  const spaceCheck = remainderOfPullRequest.match(/^\s{1,}/)
  if(spaceCheck === null) {
    return "Should be a space between start of pull request and body of pull request"
  }
  const [spaceCount] = spaceCheck;
  if(spaceCount.length > 1) {
    return "Should be only one space between start of pull request and body of pull request"
  }
  const bodyOfPullRequest = remainderOfPullRequest.substring(spaceCount.length);
  const snakeCaseCheck = bodyOfPullRequest.match(/^([a-z0-9]+){1}(_[a-z0-9]+){0,}$/);
  if(snakeCaseCheck === null) {
    return "Body of Pull request name should be in the snake_case"
  }
  return null;
}

executeScript(GITHUB_PULL_TITLE);

module.exports =  {executeScript, lintPullRequest}