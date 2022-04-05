import express from 'express';
import { readFile } from 'fs/promises';

const router = express.Router();

const viewPoint = JSON.parse(
  await readFile(new URL('../viewpointdb.json', import.meta.url)),
);

router.get('/', (_, res) => {
  res.json(viewPoint);
});

export default router;
