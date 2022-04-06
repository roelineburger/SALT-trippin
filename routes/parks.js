import express from 'express';
import { readFile } from 'fs/promises';

const router = express.Router();

const parks = JSON.parse(
  await readFile(
    new URL('./markers/parkdb.json', import.meta.url),
  ),
);

router.get('/', (_, res) => {
  res.json(parks);
});

export default router;
