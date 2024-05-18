import chalk from 'chalk';

const request = document.getElementById('request') as HTMLFormElement;
const host = document.getElementById('host') as HTMLInputElement;
const port = document.getElementById('port') as HTMLInputElement;
const path = document.getElementById('path') as HTMLInputElement;
const method = document.getElementById('method') as HTMLInputElement;
const body = document.getElementById('body') as HTMLInputElement;

const getDestination = () => {
  return `${location.protocol}//${host.value || location.hostname}:${
    port.value || location.port
  }${(path.value = '/echo')}`;
};

request.addEventListener('submit', async (e) => {
  e.preventDefault();

  const destination = getDestination();

  console.log(chalk.bgGreen.black('Requesting'), destination);

  try {
    if (method.value === 'GET') {
      const response = await fetch(destination);
      const data = await response.json();

      console.log(data);
    } else {
      const response = await fetch(destination, {
        method: method.value,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: body.value,
        }),
      });

      const data = await response.json();

      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
});
