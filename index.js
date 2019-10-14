const { spawn } = require('child_process');

const defaultExecuteCliOptions = {
  isLookForErrors: true,
  isSplitByEnter: true
};
/**
 * Execution of command in cli with help of native "child_process" node module
 * @description In process of function execution command "spawn" from "child_process" module is executing,
 *  stream of data is reading, arrays with results and errors are filling
 *  заполняются массивы с результатами и ошибками
 * @param {string} bashText cli-command for executing
 * @param {object} executeCliOptions custom options for results processing which overrides "defaultExecuteCliOptions"
 * @returns {Promise}
 */
function executeCliCommand(
  bashText,
  executeCliOptions = defaultExecuteCliOptions
) {
  const { isLookForErrors, isSplitByEnter } = executeCliOptions;
  const commandWords = bashText.split(' ');
  const [command, ...keys] = commandWords;
  const executing = spawn(command, keys);
  return new Promise(resolve => {
    const result = {
      errors: [],
      body: []
    };
    executing.stdout.on('data', data => {
      result.body.push(data.toString());
    });
    executing.stderr.on('data', data => {
      if (isLookForErrors) {
        result.errors.push(data.toString());
      }
    });
    executing.on('close', () => {
      if (result.body) {
        if (isSplitByEnter) {
          result.body = result.body.toString().split('\n');
          result.body = result.body.filter(s => s !== '');
        }
      }
      resolve(result);
    });
  });
}

module.exports = executeCliCommand;
