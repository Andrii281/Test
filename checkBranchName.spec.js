const { checkBranchName } = require('./checkBranckName')
const process = require('process');

describe('test', () => {
  test('test1', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    checkBranchName('PILL2P-12_asdas_asdasda')
    expect(exitSpy).toHaveBeenCalledWith(1);
  })
})