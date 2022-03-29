import { readFile } from 'fs/promises';
import express from "express";
import cors from "cors";
import path from 'path';
const __dirname = path.resolve();
// import ParkLogo from "../assets/national.svg";

const parks = JSON.parse(
  await readFile(
    new URL('./parkdb.json', import.meta.url)
  )
);

const port = process.env.PORT || 8080

const app = express();

app.use(cors());

app.get("/parks", (req, res) => {
  res.json(parks);
});

app.get("/logos/:id", ({ params: { id }}, res) => {
  res.sendFile(path.join(__dirname, './assets', `${id}.svg`));
});

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
