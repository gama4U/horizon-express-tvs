import express, { Request, Response } from 'express';
import { createAirlines, createTravelVoucher } from '../services/travel-voucher.service';
import { validate } from '../middlewares/validate.middleware';
import { createTravelVoucherSchema } from '../schemas/travel-voucher.schema';

const travelVoucherRouter = express.Router();

travelVoucherRouter.post('/', validate(createTravelVoucherSchema), async (req: Request, res: Response) => {
  const { shipping, airlines, ...data } = req.body;
  console.log('body', req.body)

  try {
    const travelVoucher = await createTravelVoucher(data);
    if (!travelVoucher) throw new Error('Failed to create travel voucher')
    if (travelVoucher.type === 'AIRLINES' && airlines) {
      await createAirlines({ travelId: travelVoucher.id, ...airlines })
    }
    if (travelVoucher.type === 'SHIPPING' && shipping) {
      await createAirlines({ travelId: travelVoucher.id, ...shipping })
    }
    res.status(200).json({ message: 'Successfully created travel voucher' });
  } catch (error) {
    console.log('error', error)
    res.status(500).json(error);
  }

});


export default travelVoucherRouter;
