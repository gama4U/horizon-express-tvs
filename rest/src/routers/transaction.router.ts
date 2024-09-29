import express, { Request, Response } from 'express';
import { createTransaction } from '../services/transaction.service';

const transactionRouter = express.Router();

transactionRouter.post('/', async(req: Request, res: Response) => {
  try {
    const userId = String(req.user?.id);
    
    const created = await createTransaction(userId);
    if (!created) {
      throw new Error('Failed to create transaction');
    }

    return res.status(200).json(created);

  } catch (error) {
    return res.status(500).json({message: 'Internal server error'})
  }
})
export default transactionRouter;
