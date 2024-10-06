import express, { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { createTourVoucherSchema } from '../schemas/tour-voucher.schema';
import { createTourVoucher, updateTourVoucher } from '../services/tour-voucher.service';

const tourVoucherRouter = express.Router();

tourVoucherRouter.post('/', validate(createTourVoucherSchema), async (req: Request, res: Response) => {
  try {
    const tourVoucher = await createTourVoucher(req.body)

    if (!tourVoucher) { throw new Error('Failed to create tour voucher') }
    res.status(200).json({ message: "Successfully created tour voucher" })
  } catch (error) {
    console.log('error', error)
    res.status(500).json(error)
  }
});
tourVoucherRouter.put('/:id', validate(createTourVoucherSchema), async (req: Request, res: Response) => {

  try {
    const { id } = req.params
    const tourVoucher = await updateTourVoucher(id, req.body)

    if (!tourVoucher) { throw new Error('Failed to create tour voucher') }
    res.status(200).json({ message: "Successfully created tour voucher" })
  } catch (error) {
    res.status(500).json(error)
  }
});




export default tourVoucherRouter;
