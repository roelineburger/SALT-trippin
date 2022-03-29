import express from "express";
import {readFile} from 'fs/promises'
import cors from "cors";

const parks = JSON.parse(
  await readFile(
    new URL('./parkdb.json', import.meta.url)
  )
);

const app = express();

app.use(cors());

app.get("/parks", (req, res) => {
  res.json(parks);
});

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
