import express, { Request, Response } from 'express';
import { createSalesAgreementSchema, getSalesAgreementsSchema } from '../schemas/sales-agreement.schema';
import { validate } from '../middlewares/validate.middleware';
import { createSalesAgreement, findSalesAgreements } from '../services/sales-agreement.service';

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
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

salesAgreementRouter.get('/', validate(getSalesAgreementsSchema), async(req: Request, res: Response) => {
  try {
    const {skip, take, search} = req.query;

    const filters = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      search: search ?  String(search) : undefined,
    };

    const salesAgreements = await findSalesAgreements(filters);

    if (!salesAgreements) {
      throw new Error('Failed to create sales agreements')
    }

    return res.status(200).json(salesAgreements);

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
});

export default salesAgreementRouter;