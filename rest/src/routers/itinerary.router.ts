import express, { Request, Response } from 'express';
import { updateItinerary, createItinerary } from '../services/tour-voucher.service';

const itineraryRouter = express.Router();

itineraryRouter.post('/', async (req: Request, res: Response) => {
  try {
    const itinerary = await createItinerary(req.body)
    if (!itinerary) { throw new Error('Failed to create itinerary') }
    res.status(200).json({ message: "Successfully created itinerary" })
  } catch (error) {
    console.log('error', error)
    res.status(500).json(error)
  }
});


itineraryRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const itinerary = await updateItinerary({ id, ...req.body })
    if (!itinerary) { throw new Error('Failed to update itinerary') }
    res.status(200).json({ message: "Successfully created itinerary" })
  } catch (error) {
    console.log('error', error)
    res.status(500).json(error)
  }
});

export default itineraryRouter;
