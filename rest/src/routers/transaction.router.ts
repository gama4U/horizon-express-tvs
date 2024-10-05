import express, { Request, Response } from 'express';
import { createTransaction, fetchTransaction } from '../services/transaction.service';

const transactionRouter = express.Router();

transactionRouter.post('/', async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?.id);
    const { salesAgreementId } = req.body;

    const created = await createTransaction({ leadId: userId, salesAgreementId });
    if (!created) {
      throw new Error('Failed to create transaction');
    }

    return res.status(200).json(created);

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

transactionRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const fetched = await fetchTransaction({ id })
    if (!fetched) throw new Error('Failed to fetch transaction')

    return res.status(200).json(fetched)

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }

})
export default transactionRouter;

