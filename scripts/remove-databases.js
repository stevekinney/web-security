import fg from 'fast-glob';
import chalk from 'chalk';
import { unlink } from 'fs/promises';

console.log(chalk.bgCyan.black('Database Cleanup'));

const files = await fg.glob('**/*/*.sqlite');

if (!files.length) {
  console.log(chalk.green('No Databases Found. Exiting…'));
  process.exit();
}

const result = await Promise.all(
  files.map(async (file) => {
    try {
      await unlink(file);
      return chalk.blue(`Deleted ${file}`);
    } catch (error) {
      return chalk.red(`Failed to delete ${file}`);
    }
  })
);
