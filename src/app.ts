import express from "express";
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
