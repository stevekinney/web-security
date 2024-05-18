import chalk from 'chalk';

console.log(`Hello from ${chalk.green('client/index.ts')}.`);

const request = document.getElementById('request') as HTMLFormElement;
const post = document.getElementById('post') as HTMLFormElement;

const host = document.getElementById('host') as HTMLInputElement;
const port = document.getElementById('port') as HTMLInputElement;
const path = document.getElementById('path') as HTMLInputElement;
const data = document.getElementById('new-data') as HTMLInputElement;

const getDestination = () => {
  return `${location.protocol}//${host.value || location.hostname}:${
    port.value || location.port
  }${(path.value = '/data')}`;
};

request.addEventListener('submit', async (e) => {
  e.preventDefault();
  const destination = getDestination();

  console.log(chalk.bgGreen.black('Requesting'), destination);

  try {
    const response = await fetch(destination);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

post.addEventListener('submit', async (e) => {
  e.preventDefault();
  const destination = getDestination();

  console.log(chalk.bgGreen.black('Posting'), destination);

  try {
    const response = await fetch(destination, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: data.value,
      }),
    });

    const responseData = await response.json();

    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
});
