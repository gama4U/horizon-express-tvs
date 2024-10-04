import express, { Request, Response } from 'express';
import { createSalesAgreementSchema, getSalesAgreementsSchema } from '../schemas/sales-agreement.schema';
import { validate } from '../middlewares/validate.middleware';
import { createSalesAgreement, findSalesAgreements } from '../services/sales-agreement.service';
import { ClientType } from '@prisma/client';

const salesAgreementRouter = express.Router();

salesAgreementRouter.post('/', validate(createSalesAgreementSchema), async(req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const created = await createSalesAgreement({creatorId: userId, ...req.body});
    if (!created) {
      throw new Error('Failed to create sales agreement')
    }

    return res.status(200).json({
      ...created,
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
    const {skip, take, search, typeOfClient} = req.query;

    const filters = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      search: search ?  String(search) : undefined,
      typeOfClient: typeOfClient ?  typeOfClient as ClientType : undefined,
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