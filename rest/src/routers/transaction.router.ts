import express, { Request, Response } from 'express';
import { createTransaction, deleteTransaction, fetchTransaction, fetchTransactions, fetchTransactionSummary, updateTransaction } from '../services/transaction.service';
import { validate } from '../middlewares/validate.middleware';
import { getTransactionsSchema } from '../schemas/transaction.schema';

const transactionRouter = express.Router();

transactionRouter.get('/', validate(getTransactionsSchema), async (req: Request, res: Response) => {
  try {

    const { skip, take, search, travel, accommodation, tour, transport } = req.query;

    const filters = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      search: search ? String(search) : undefined,
      travel: travel === 'true' ? true : undefined,
      accommodation: accommodation === 'true' ? true : undefined,
      tour: tour === 'true' ? true : undefined,
      transport: transport === 'true' ? true : undefined,
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

    const created = await createTransaction(req.body);
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


transactionRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const update = await updateTransaction({ id, ...req.body });

    if (!update) throw new Error('Failed to update transaction');

    return res.status(200).json(update);

  } catch (error: any) {
    if (error.message.includes('already attached')) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

transactionRouter.delete('/:id', async (req: Request, res: Response) => {

  try {
    const { id } = req.params
    const deleted = await deleteTransaction(id)
    if (!deleted) throw new Error('Failed to delete transaction')

    return res.status(200).json(deleted)

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})


transactionRouter.post('/summary', async (req: Request, res: Response) => {

  const { from, to } = req.body;

  if (!from || !to) {
    return res.status(400).json({ message: 'Start date and end date are required.' });
  }

  try {
    const start = new Date(from);
    const end = new Date(to);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format.' });
    }

    const data = await fetchTransactionSummary(start, end);

    const rate = data.total > 0 ? (data.since7days / data.total) * 100 : 0;

    return res.status(200).json({
      since7days: data.since7days,
      rate: parseFloat(rate.toFixed(2)),
      total: data.total,
      enrichedTransactions: data.enrichedTransactions,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});




export default transactionRouter;

