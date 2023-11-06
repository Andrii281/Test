/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line
import childProcess from 'child_process';

const { CI_MERGE_REQUEST_SOURCE_BRANCH_NAME, CI_MERGE_REQUEST_LABELS } = process.env;
const computeLocalBranchName = () =>
  // eslint-disable-next-line
  childProcess.execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).toString().trim();
const sourceBranchName = CI_MERGE_REQUEST_SOURCE_BRANCH_NAME ?? computeLocalBranchName();
const branchNameWhiteList = ['main', 'develop', 'HEAD'];

(function () {
  if (sourceBranchName) {
    if (branchNameWhiteList.some(branch => branch === sourceBranchName)) {
      process.exit(0);
    }

    const error = lintBranchName(sourceBranchName, CI_MERGE_REQUEST_LABELS);

    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      process.exit(1);
    }
  }
})();

export default function lintBranchName(branchName, mergeRequestLabels = '') {
  const jiraIdRegex = /^([A-Z]+-[0-9]+)/; // e.g. EMPCOMS-52
  const snakeCaseRegex = /^([a-z0-9_]+)$/; // e.g. only_snake_case_lowercase_allowed

  if (mergeRequestLabels.includes('bypass branch lint')) {
    return undefined;
  }

  const allowedPrefixes = ['feat', 'fix', 'hotfix', 'refactor', 'sync', 'docs', 'ci'];
  const allowedPrefixesList = allowedPrefixes.join(', ');
  let mergeRequestBranchNameTitle;

  if (branchName.includes('/')) {
    const [mergeRequestBranchNamePrefix, ...branchNameTitle] = branchName.split('/');
    mergeRequestBranchNameTitle = branchNameTitle[branchNameTitle.length - 1];

    if (!allowedPrefixes.some(prefix => prefix === mergeRequestBranchNamePrefix)) {
      // eslint-disable-next-line max-len
      return `The source branch name of the merge request must start with the \`prefix/\, where the prefix could be either: ${allowedPrefixesList}: ${branchName}`;
    }
  } else {
    if (branchName.match(jiraIdRegex)) {
      const [id] = branchName.match(jiraIdRegex);

      mergeRequestBranchNameTitle = branchName.substring(id.length);
    } else {
      return `The source branch name of the merge request must start with the jira task id: ${branchName}`;
    }
  }

  if (!snakeCaseRegex.test(mergeRequestBranchNameTitle)) {
    return `The source branch name should follow snake_case lowercase format: ${branchName}`;
  }

  return undefined;
}