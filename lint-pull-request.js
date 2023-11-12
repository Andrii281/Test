const { GITHUB_HEAD_REF, GITHUB_EVENT_NAME } = process.env;

if(GITHUB_EVENT_NAME !== "pull_request") {
  console.log("no pull request")
}

pullRequestName(GITHUB_EVENT_NAME)

function lintPullRequest(pullRequestName) {
  const startNmaeCheck = pullRequestName.match(/^(\[ PILLP-\d+ ]){1}/);
  console.log("startNmaeCheck: ", startNmaeCheck)
}