import express, { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { IFindPackages } from '../interfaces/package.interface';
import { getPackagesSchema } from '../schemas/package.schema';
import { findPackages } from '../services/package.service';

const packageRouter = express.Router();

packageRouter.get('/', validate(getPackagesSchema), async (req: Request, res: Response) => {
  try {
    const query = {
      skip: Number(req.query.skip),
      take: Number(req.query.take),
      search: req.query.search,
      branch: req.query.branch,
      type: req.query.type
    } as IFindPackages;

    const packages = await findPackages(query);
    if (!packages) throw new Error('Failed to get packages');

    res.status(200).json(packages);

  } catch (error) {
    res.status(500).json(error);
  }
});

export default packageRouter;
