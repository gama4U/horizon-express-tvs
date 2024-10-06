import express, { Request, Response } from 'express';
import { updateSalesAgreementSchema } from '../schemas/sales-agreement.schema';
import { validate } from '../middlewares/validate.middleware';
import { deleteSalesAgreementById, findSalesAgreementById, updateSalesAgreement } from '../services/sales-agreement.service';
import { PaymentType, PurchaseRequestOrderType } from '@prisma/client';
import { deleteSalesAgreementItems } from '../services/sales-agreement-item.service';
import { createPurchaseRequestSchema, findPurchaseRequestsSchema, updatePurchaseRequestSchema } from '../schemas/purchase-request.schema';
import { createPurchaseRequest, findPurchaseRequests, updatePurchaseRequest } from '../services/purchase-request.service';

const purchaseRequestRouter = express.Router();

purchaseRequestRouter.post('/', validate(createPurchaseRequestSchema), async(req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const created = await createPurchaseRequest({creatorId: userId, ...req.body});
    if (!created) {
      throw new Error('Failed to create sales agreement')
    }

    return res.status(200).json({
      ...created,
      message: 'Purchase request created successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

purchaseRequestRouter.put('/:id', validate(updatePurchaseRequestSchema), async(req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const created = await updatePurchaseRequest({id, ...req.body});
    if (!created) {
      throw new Error('Failed to update purchase request')
    }

    return res.status(200).json({
      ...created,
      message: 'Purchase request updated successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

purchaseRequestRouter.get('/', validate(findPurchaseRequestsSchema), async(req: Request, res: Response) => {
  try {
    const {skip, take, search, type, paymentType} = req.query;

    const filters = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      search: search ?  String(search) : undefined,
      type: type ?  type as PurchaseRequestOrderType : undefined,
      paymentType:  paymentType ?  paymentType as PaymentType : undefined,
    };

    const purchaseRequests = await findPurchaseRequests(filters);

    if (!purchaseRequests) {
      throw new Error('Failed to find purchase requests')
    }

    return res.status(200).json(purchaseRequests);

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
});

purchaseRequestRouter.get('/:id', async(req: Request, res: Response) => {
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

// purchaseRequestRouter.delete('/:id', async(req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
    
//     const  deletedItems = await deletePurchaseRequestItems(id);
//     if (!deletedItems) {
//       throw new Error('Failed to delete sales agreement items');
//     }

//     const deleted = await deleteSalesAgreementById(salesAgreementId);
//     if (!deleted) {
//       return res.status(404).json({message: 'Sales agreement not found'});
//     }

//     return res.status(200).json({
//       message: 'Sales agreement deleted successfully'
//     });
  
//   } catch (error) {
//     return res.status(500).json({
//       message: 'Internal server error'
//     })
//   }
// })

export default purchaseRequestRouter;
