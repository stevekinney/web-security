import { concurrently } from 'concurrently';
import chalk from 'chalk';

const attackerPort = process.env.PORT || 4000;
const victimPort = +attackerPort + 100;

console.log(
  '💀',
  `${chalk.bgRed('Attacker')}: ${chalk.red(`http://localhost:${attackerPort}`)}`
);

console.log(
  '🎯',
  `${chalk.bgBlue('Victim')}: ${chalk.blue(`http://localhost:${victimPort}`)}`
);

concurrently([
  {
    command: `PORT=${attackerPort} VICTIM_PORT=${victimPort} node attacker.js`,
    name: 'attacker',
  },
  { command: `PORT=${victimPort} node victim.js`, name: 'victim' },
]);
