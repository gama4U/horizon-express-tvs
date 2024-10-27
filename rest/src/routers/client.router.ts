import express, { Request, Response } from 'express';
import { createClient, deleteClient, fetchClients, updateClient, updateClientApprover } from '../services/client.service';
import { validate } from '../middlewares/validate.middleware';
import { getClientsSchema } from '../schemas/client.schema';
import { ClientType, UserType } from '@prisma/client';
import { authorize } from '../middlewares/authorize.middleware';

const clientRouter = express.Router();


clientRouter.post('/', async (req: Request, res: Response) => {
  try {

    const created = await createClient(req.body)
    if (!created) throw new Error('Failed to create client');

    return res.status(200).json(created);

  } catch (error) {
    res.status(500).json(error);
  }
});


clientRouter.get('/', validate(getClientsSchema), async (req: Request, res: Response) => {
  try {

    const { skip, take, search, branch, typeOfClient } = req.query;

    const filters = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      search: search ? String(search) : undefined,
      branch: branch ? String(branch) : undefined,
      typeOfClient: typeOfClient ? typeOfClient as ClientType : undefined,
    };

    const clients = await fetchClients(filters);

    if (!clients) {
      throw new Error('Failed to get clients')
    }
    return res.status(200).json(clients);

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
});

clientRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updated = await updateClient(id, req.body)
    if (!updated) throw new Error('Failed to update client');

    return res.status(200).json(updated);

  } catch (error) {
    res.status(500).json(error);
  }
});

clientRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await deleteClient(id);
    if (!deleted) {
      throw new Error('Failed to delete client');
    }

    return res.status(200).json({
      message: 'Client deleted successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
})

clientRouter.patch('/:id/approver', authorize([UserType.ADMIN]), async (req: Request, res: Response) => {
  try {
    const approverId = String(req.user?.id);
    const id = req.params.id;

    const update = await updateClientApprover({ id, approverId });
    if (!update) {
      throw new Error('Failed to approve client');
    }

    return res.status(200).json({
      message: 'Client approved successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});




export default clientRouter;
