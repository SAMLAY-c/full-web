/**
 * 日志工具
 */

const chalk = require('chalk');

class Logger {
  constructor(verbose = false) {
    this.verbose = verbose;
  }

  info(message, data = null) {
    console.log(chalk.blue('ℹ'), message);
    if (data && this.verbose) {
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
    }
  }

  success(message) {
    console.log(chalk.green('✓'), message);
  }

  error(message, error = null) {
    console.error(chalk.red('✗'), message);
    if (error && this.verbose) {
      console.error(chalk.red(error.stack));
    }
  }

  warn(message) {
    console.log(chalk.yellow('⚠'), message);
  }

  debug(message, data) {
    if (this.verbose) {
      console.log(chalk.gray('[DEBUG]'), message, data);
    }
  }
}

module.exports = new Logger();
