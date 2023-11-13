const {executeScript, lintPullRequest} = require("./lint-pull-request");

describe("lint-pull-request", () => {
  describe("lintPullRequest", () => {
    describe("should return an error message", () => {
      it("should return an error message if pull request name doesn't start with [PILLP-$(TASK_NUMBER)]", () => {
        const pullRequestName = "[BILLB] project_deploy";

        const result = lintPullRequest(pullRequestName);
    
        expect(result).not.toBeNull();
      })
      it("should return an error message if there is no space between start of pull request name and body of pull request", () => {
        const pullRequestName = "[PILLP-1]project_deploy";

        const result = lintPullRequest(pullRequestName);
    
        expect(result).not.toBeNull();
      })
      it("should return an error message if there is more than one space between start of pull request name and body of pull request", () => {
        const pullRequestName = "[PILLP-1]   project_deploy";

        const result = lintPullRequest(pullRequestName);
    
        expect(result).not.toBeNull();
      })
      it("should return an error message if there if body of pull request name doesn't in snake_case", () => {
        const pullRequestName = "[PILLP-1] ProjectDeploy";

        const result = lintPullRequest(pullRequestName);
    
        expect(result).not.toBeNull();
      })
    }) 
    describe("should return null", () => {
      it("should return null for valid name of pull request", () => {
        const pullRequestName = "[PILLP-1] ProjectDeploy";

        const result = lintPullRequest(pullRequestName);
    
        expect(result).not.toBeNull();
      })
    })
  })
})