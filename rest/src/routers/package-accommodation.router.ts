import express, { Request, Response } from 'express';
import { createPackageAccommodation, updatePackageAccommodation } from '../services/package-accommodation.service';

const packageAccommodationRouter = express.Router();

packageAccommodationRouter.post('/', async (req: Request, res: Response) => {
  try {
    const created = await createPackageAccommodation({...req.body});
    if (!created) throw new Error('Failed to create package accommodation');

    res.status(200).json({
      message: 'Created successfully'
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

packageAccommodationRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const created = await updatePackageAccommodation({id, ...req.body});
    if (!created) throw new Error('Failed to update package accommodation');

    res.status(200).json({
      message: 'Updated successfully'
    });

  } catch (error) {
    res.status(500).json(error);
  }
});


export default packageAccommodationRouter;
