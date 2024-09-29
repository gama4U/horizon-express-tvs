import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import morgan from "morgan";
import * as dotenv from 'dotenv';
import path from "path";
import { User } from "@prisma/client";
import mainRouter from "./middlewares/main-router.middleware";
import authRouter from "./routers/auth.router";
import userRouter from "./routers/user.router";
import uploadRouter from "./routers/upload.router";

declare module 'express' {
  interface Request {
    user?: User;
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/uploads/', express.static(path.join(__dirname, './uploads')));
app.use('/auth', authRouter);
app.use('/api', mainRouter);

mainRouter.use('/users', userRouter);
mainRouter.use('/uploads', uploadRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});
