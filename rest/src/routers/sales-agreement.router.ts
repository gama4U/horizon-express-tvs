import express, { Request, Response } from 'express';
import { createSalesAgreementSchema, getSalesAgreementsSchema, updateSalesAgreementSchema } from '../schemas/sales-agreement.schema';
import { validate } from '../middlewares/validate.middleware';
import { createSalesAgreement, deleteSalesAgreementById, findSalesAgreementById, findSalesAgreements, updateSalesAgreement } from '../services/sales-agreement.service';
import { ClientType } from '@prisma/client';
import { deleteSalesAgreementItems } from '../services/sales-agreement-item.service';

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

salesAgreementRouter.put('/:id', validate(updateSalesAgreementSchema), async(req: Request, res: Response) => {
  try {
    const salesAgreementItemId = req.params.id;

    const created = await updateSalesAgreement({id: salesAgreementItemId, ...req.body});
    if (!created) {
      throw new Error('Failed to update sales agreement')
    }

    return res.status(200).json({
      ...created,
      message: 'Sales agreement update successfully'
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

salesAgreementRouter.get('/:id', async(req: Request, res: Response) => {
  try {
    const salesAgreementId = req.params.id;
    
    const salesAgreement = await findSalesAgreementById(salesAgreementId);
    if (!salesAgreement) {
      return res.status(404).json({message: 'Sales agreement not found'});
    }

    return res.status(200).json(salesAgreement);
  
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
})


salesAgreementRouter.delete('/:id', async(req: Request, res: Response) => {
  try {
    const salesAgreementId = req.params.id;
    
    const  deletedItems = await deleteSalesAgreementItems(salesAgreementId);
    if (!deletedItems) {
      throw new Error('Failed to delete sales agreement items');
    }

    const deleted = await deleteSalesAgreementById(salesAgreementId);
    if (!deleted) {
      return res.status(404).json({message: 'Sales agreement not found'});
    }

    return res.status(200).json({
      message: 'Sales agreement deleted successfully'
    });
  
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
})

export default salesAgreementRouter;
