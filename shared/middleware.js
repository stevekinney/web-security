import chalk from 'chalk';

/**
 * @type {import('express').RequestHandler}
 */
export const logRequests = (req, res, next) => {
  if (req.url.includes('.vite')) return next();
  console.log(chalk.bgCyan.black(req.method), chalk.cyan(req.url));
  console.log(chalk.bgMagentaBright.black('Headers'), req.headers);

  next();
};

/**
 * @type {import('express').RequestHandler}
 */
export const logResponses = (req, res, next) => {
  const { statusCode, statusMessage } = res;
  console.log(chalk.bgGreen.black(statusCode), chalk.green(statusMessage));

  next();
};
