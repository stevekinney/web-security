// @ts-nocheck

/**
 * Generate the page for looking at the database.
 */
export function generateHtml(data) {
  let htmlString = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="https://fav.farm/🍦">
      <title>Database</title>
      <link rel="stylesheet" href="./styles.css">
  </head>
  <body class="bg-purple-200">
  <main class="container my-16 flex flex-col gap-16">
  `;

  data.forEach((table) => {
    htmlString += '<section class="bg-purple-50 p-8 rounded shadow-md">';
    htmlString += `<h2 id="${table.name}">${table.name}</h2>`;
    htmlString += `<p class="mb-8 font-mono text-purple-800 select-all">${table.sql}</p>`;
    htmlString += '<table><tr>';

    // Add table headers
    table.columns.forEach((column) => {
      htmlString += `<th class="bg-purple-100">${column.name}</th>`;
    });

    htmlString += '</tr>';

    // Add table data
    table.data.forEach((row) => {
      htmlString += '<tr>';
      table.columns.forEach((column) => {
        htmlString += `<td>${row[column.name]}</td>`;
      });
      htmlString += '</tr>';
    });
    htmlString += '</table>';
    htmlString += '</section>';
  });

  htmlString += `
  </main>
  </body>
  </html>
  `;

  return htmlString;
}
