import express from 'express';
import { findOneUser, postRoute, deleteRoute } from './modules/mongo.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { route } = req.body;
  const { user } = req.body;
  await postRoute(user, route);
  res.json(route);
});

router.post('/user', async (req, res) => {
  const email = req.body.user;
  const userInfo = await findOneUser(email);
  res.json(userInfo);
});

router.delete('/route', (req, res) => {
  const id = req.body.routeId;
  const { user } = req.body;
  deleteRoute(user, id);
  res.sendStatus(204);
});

export default router;
