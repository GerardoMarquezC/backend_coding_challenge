const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  const port = process.env.PORT;
  const server = process.env.SERVER_ID;
  res.json({ port, server });
});

module.exports = router;
