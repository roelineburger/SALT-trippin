import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const getFuelPrice = async () => {
  const query = await fetch('https://henrikhjelm.se/api/getdata.php?lan=stockholms-lan');
  const json = await query.json();
  const petrol = json.stockholmslan_Preem_TabyVikingavagen_6__Taby_kyrkby__95;
  const diesel = json.stockholmslan_Tanka_OsterakerRallarvagen_9_Akersberga__diesel;
  return { petrol, diesel };
};

router.get('/', async (_, res) => {
  const fuel = await getFuelPrice();
  res.json(fuel);
});

export default router;
