import express from "express";
import path from "node:path";
import apiRouter from "./apiRouter.mjs";

const app = express();
const PORT = 3001;

const __dirname = "";

// OUR OWN MIDDLEWARE
const logger = (req, res, next) => {
  console.log(req.params);
  console.log(req.query);
  next();
};

// CONFIG
app.use(logger);
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use("/api", apiRouter);

// ROUTES
app.get("/", (req, res) => {
  res.json({ status: 200, msg: "Hello World2!" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
