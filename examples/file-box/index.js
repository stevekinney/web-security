import { startServer, createServer } from '#shared';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { writeFile, readdir } from 'fs/promises';
import mime from 'mime';

const app = createServer({
  viewEngine: 'handlebars',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileDirectory = join(__dirname, 'files');

app.get('/', async (req, res) => {
  const files = await readdir(fileDirectory);
  const filesWithTypes = files.map((file) => {
    return { name: file, type: mime.getType(file) };
  });

  res.render('index', { files: filesWithTypes });
});

// Endpoint to fetch files
app.get('/files', (req, res) => {
  const fileName = String(req.query.file);
  const filePath = join(fileDirectory, fileName);

  if (fileName) {
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send('File not found');
      }
    });
  } else {
    res.status(400).send('File name not provided');
  }
});

app.post('/files', async (req, res) => {
  const { filename, data } = req.body;

  const filePath = join(fileDirectory, filename);

  console.log('Writing file to  ' + filePath);

  try {
    await writeFile(filePath, data, 'utf-8');
    res.send('File saved');
  } catch (err) {
    res.status(500).send('Error saving file');
  }
});

startServer(app);
