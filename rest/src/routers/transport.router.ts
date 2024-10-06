import express, { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { createTransportVoucherSchema, updateTransportVoucherSchema } from '../schemas/transport-voucher.schema';
import { createTransportVoucher, updateTransportVoucher } from '../services/transport-voucher.service';

const transportVoucherRouter = express.Router();

transportVoucherRouter.post('/', validate(createTransportVoucherSchema), async (req: Request, res: Response) => {
  try {
    const transportVoucher = await createTransportVoucher(req.body)
    if (!transportVoucher) { throw new Error('Failed to create transport voucher') }

    res.status(200).json({ message: "Successfully created transport voucher" })
  } catch (error) {
    res.status(500).json(error)

  }
});

transportVoucherRouter.put('/:id', validate(updateTransportVoucherSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const update = await updateTransportVoucher({ id, ...req.body })

    if (!update) { throw new Error('Failed to update transport voucher') }
    res.status(200).json({ message: "Successfully updated tour voucher" })
  } catch (error) {
    console.log('error', error)
    res.status(500).json(error)
  }
});



export default transportVoucherRouter;
