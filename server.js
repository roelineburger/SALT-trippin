import express from 'express';
import cors from 'cors';
import path from 'path';
import parksRouter from './routes/parks.js';
import fuelRouter from './routes/fuel.js';
import logosRouter from './routes/logos.js';

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use('/fuel', fuelRouter);
app.use('/parks', parksRouter);
app.use('/logos', logosRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening on port: ${port}`);
});
