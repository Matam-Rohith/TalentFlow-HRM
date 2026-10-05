import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const host = '0.0.0.0';

const staticDir = fs.existsSync(join(__dirname, 'dist')) ? join(__dirname, 'dist') : __dirname;

app.use(express.static(staticDir));
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  if (fs.existsSync(join(staticDir, 'index.html'))) {
    res.sendFile(join(staticDir, 'index.html'));
  } else {
    res.sendFile(join(__dirname, 'index.html'));
  }
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
