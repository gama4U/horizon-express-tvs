import express, { Request, Response } from 'express';
import { createSalesAgreementSchema } from '../schemas/sales-agreement.schema';
import { validate } from '../middlewares/validate.middleware';
import { createSalesAgreement } from '../services/sales-agreement.service';

const salesAgreementRouter = express.Router();

salesAgreementRouter.post('/', validate(createSalesAgreementSchema), async(req: Request, res: Response) => {
  try {
    const created = await createSalesAgreement(req.body);
    if (!created) {
      throw new Error('Failed to create sales agreement')
    }

    return res.status(200).json({
      message: 'Sales agreement created successfully'
    });

  } catch (error) {
    return res.status(200).json({message: 'Internal server error'});
  }
})

export default salesAgreementRouter;