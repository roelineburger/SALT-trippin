import express from "express";

const router = express.Router()

router.get("/:id", ({ params: { id }}, res) => {
  // res.sendFile(path.join(__dirname, './assets', `${id}.svg`));
  res.json('logos')
})

export { router as default }