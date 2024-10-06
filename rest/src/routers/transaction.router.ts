import express, { Request, Response } from 'express';
import { createTransaction, fetchTransaction, fetchTransactions } from '../services/transaction.service';
import { validate } from '../middlewares/validate.middleware';
import { getTransactionsSchema } from '../schemas/transaction.schema';

const transactionRouter = express.Router();

transactionRouter.get('/', validate(getTransactionsSchema), async (req: Request, res: Response) => {
  try {
    const { skip, take, search } = req.query;

    const filters = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      search: search ? String(search) : undefined,
    };

    const transactions = await fetchTransactions(filters);

    if (!transactions) {
      throw new Error('Failed to get transactions')
    }

    return res.status(200).json(transactions);

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })

  }

})

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

