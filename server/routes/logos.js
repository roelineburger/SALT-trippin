import express from 'express';

const router = express.Router();

router.get('/:id', (req, res) => {
  // res.sendFile(path.join(__dirname, './assets', `${id}.svg`));
  res.json('logos');
});

export default router;
