import express from "express";
import path from "node:path";
import apiRouter from "./apiRouter.mjs";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import routes from "./middleware/routes.mjs";

const { route404, route500 } = routes;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __dirname = "";

// CONFIG
app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", apiRouter);

// ROUTES
app.get("/", (req, res) => {
  res.json({ status: 200, msg: "Hello World2!" });
});

app.use(route404);

app.use(route500);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
