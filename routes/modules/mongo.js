import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

const connectToDB = async () => {
  const uri = `mongodb+srv://fspUser:${process.env.MONGO_PASSWORD}@clusterfps.d0q5v.mongodb.net/Trippin?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const db = client.db('Trippin');
  const collection = db.collection('trips');
  return { collection, client };
};

const findOneUser = async (email) => {
  const { collection, client } = await connectToDB();
  const userData = await collection.findOne({ user: email });
  setTimeout(() => client.close(), 1000);
  return userData.routes;
};

const postRoute = async (email, routeObj) => {
  const { collection, client } = await connectToDB();
  await collection.updateOne(
    { user: email },
    {
      $push: {
        routes: {
          routeId: uuidv4(),
          route: routeObj.trip,
        },
      },
    },
    { upsert: true },
  );
  setTimeout(() => client.close(), 1000);
};

const deleteRoute = async (user, id) => {
  const { collection, client } = await connectToDB();
  await collection.updateOne(
    { user },
    { $pull: { routes: { routeId: id } } },
  );
  client.close();
};

export {
  findOneUser,
  postRoute,
  deleteRoute,
};
