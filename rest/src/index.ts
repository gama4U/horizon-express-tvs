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
import salesAgreementRouter from "./routers/sales-agreement.router";
import transactionRouter from "./routers/transaction.router";
import travelVoucherRouter from "./routers/travel.router";
import accommodationVoucherRouter from "./routers/accommodation.router";
import tourVoucherRouter from "./routers/tours.router";
import transportVoucherRouter from "./routers/transport.router";
import tourItineraryRouter from "./routers/tour-itinerary.router";
import transportItineraryRouter from "./routers/transport-itinerary.router";

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
app.use('/api/v1', mainRouter);

mainRouter.use('/users', userRouter);
mainRouter.use('/uploads', uploadRouter);
mainRouter.use('/travel-vouchers', travelVoucherRouter);
mainRouter.use('/accommodation-vouchers', accommodationVoucherRouter);
mainRouter.use('/tour-vouchers', tourVoucherRouter);
mainRouter.use('/transport-vouchers', transportVoucherRouter);
mainRouter.use('/sales-agreements', salesAgreementRouter);
mainRouter.use('/transactions', transactionRouter);
mainRouter.use('/tour-itineraries', tourItineraryRouter);
mainRouter.use('/transport-itineraries', transportItineraryRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});
