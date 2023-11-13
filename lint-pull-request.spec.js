import {executeScript, lintPullRequest} from "./lint-pull-request"

describe("lint-pull-request", () => {
  describe("lintPullRequest", () => {
    describe("should not return null", () => {
      it("should not return null if pull request name doesn't start with [PILLP-$(TASK_NUMBER)]", () => {
        const pullRequestName = "[BILLB] project_deploy";

        const result = lintPullRequest(pullRequestName);
    
        expect(result).not.toBeNull();
      })
      it("should not return null if there is no space between start of pull request name and body of pull request", () => {
        const pullRequestName = "[PILLP-1]project_deploy";

        const result = lintPullRequest(pullRequestName);
    
        expect(result).not.toBeNull();
      })
      it("should not return null if there is more than one space between start of pull request name and body of pull request", () => {
        const pullRequestName = "[PILLP-1]   project_deploy";

        const result = lintPullRequest(pullRequestName);
    
        expect(result).not.toBeNull();
      })
      it("should not return null if there is more than one space between start of pull request name and body of pull request", () => {
        const pullRequestName = "[PILLP-1] ProjectDeploy";

        const result = lintPullRequest(pullRequestName);
    
        expect(result).not.toBeNull();
      })
    }) 
  })
})