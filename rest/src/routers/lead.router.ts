import express, { Request, Response } from 'express';
import { createLead, fetchLeads, updateLead } from '../services/lead.service';
import { validate } from '../middlewares/validate.middleware';
import { getLeadsSchema } from '../schemas/lead.schema';

const leadRouter = express.Router();


leadRouter.post('/', async (req: Request, res: Response) => {
  try {

    const created = await createLead(req.body)
    if (!created) throw new Error('Failed to create lead');

    return res.status(200).json(created);

  } catch (error) {
    res.status(500).json(error);
  }
});


leadRouter.get('/', validate(getLeadsSchema), async (req: Request, res: Response) => {
  try {

    const { skip, take, search } = req.query;

    const filters = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      search: search ? String(search) : undefined,
    };

    const leads = await fetchLeads(filters);

    if (!leads) {
      throw new Error('Failed to get leads')
    }
    return res.status(200).json(leads);

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
})
leadRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updated = await updateLead(id, req.body)
    if (!updated) throw new Error('Failed to update lead');

    return res.status(200).json(updated);

  } catch (error) {
    res.status(500).json(error);
  }
});


export default leadRouter;
