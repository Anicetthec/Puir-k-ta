import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const app = express();
const port = Number(process.env.PORT) || 4173;
const root = path.dirname(fileURLToPath(import.meta.url));

app.disable('x-powered-by');
app.use(express.static(root, { extensions: ['html'] }));

app.get('*splat', (_request, response) => {
  response.sendFile(path.join(root, 'index.html'));
});

app.listen(port, () => {
  console.log(`Puir-kèta Fashion disponible sur http://localhost:${port}`);
});
