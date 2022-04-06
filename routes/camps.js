import express from 'express';
import { readFile } from 'fs/promises';

const router = express.Router();

const campGround = JSON.parse(
  await readFile(new URL('./markers/campingdb.json', import.meta.url)),
);

router.get('/', (_, res) => {
  res.json(campGround);
});

export default router;
