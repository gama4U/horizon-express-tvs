import express, { Request, Response } from 'express';
import { createTransaction } from '../services/transaction.service';

const transactionRouter = express.Router();

transactionRouter.post('/', async (req: Request, res: Response) => {
  try {
    console.log('here')

    const userId = String(req.user?.id);
    const { salesAgreementId } = req.body;

    const created = await createTransaction({ leadId: userId, salesAgreementId });
    if (!created) {
      throw new Error('Failed to create transaction');
    }

    return res.status(200).json(created);

  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})
export default transactionRouter;
