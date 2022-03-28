import express from "express";
import cors from "cors";
import parks from "./parkdb.json" assert { type: "json" };
// import ParkLogo from "../assets/national.svg";

const app = express();

app.use(cors());

app.get("/parks", (req, res) => {
  res.json(parks);
});

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
