import express, { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { getSuppliersSchema } from '../schemas/supplier.schema';
import { createSupplier, deleteSupplier, fetchSuppliers, updateSupplier } from '../services/supplier.service';

const supplierRouter = express.Router();

supplierRouter.post('/', async (req: Request, res: Response) => {
  try {

    const created = await createSupplier(req.body)
    if (!created) throw new Error('Failed to create supplier');

    return res.status(200).json(created);

  } catch (error) {
    res.status(500).json(error);
  }
});

supplierRouter.get('/', validate(getSuppliersSchema), async (req: Request, res: Response) => {
  try {

    const { skip, take, search } = req.query;
    const filters = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      search: search ? String(search) : undefined,
    };

    const clients = await fetchSuppliers(filters);

    if (!clients) {
      throw new Error('Failed to get suppliers')
    }
    return res.status(200).json(clients);

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
});

supplierRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updated = await updateSupplier(id, req.body)
    if (!updated) throw new Error('Failed to update supplier');

    return res.status(200).json(updated);

  } catch (error) {
    res.status(500).json(error);
  }
});

supplierRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await deleteSupplier(id);
    if (!deleted) {
      throw new Error('Failed to delete supplier');
    }

    return res.status(200).json({
      message: 'Supplier deleted successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
})

export default supplierRouter;
