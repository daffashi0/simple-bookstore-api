import express from "express";
import logger from "morgan";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import cors from "cors";

// Routes
import ApiRouter from './routes';
// Create Express server
export const app = express();

// Express configuration
app.use(cors());
app.use(express.json());
app.use('/api', ApiRouter);

app.listen(3000, ()=> console.log('Server up and running...'));
// app.set("port", process.env.PORT || 3000);
// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "pug");

// app.use(logger("dev"));

// app.use(express.static(path.join(__dirname, "../public")));
// app.use("/", index);

// app.use(errorNotFoundHandler);
// app.use(errorHandler);
