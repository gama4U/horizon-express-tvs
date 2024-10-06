import { z } from "zod";

export const createTourVoucherSchema = z.object({
  body:
    z.object({
      transactionId: z.string().min(1, {
        message: "Invalid ID"
      }),
      tourGuide: z.string(),
      remarks: z.string().optional(),
      tourContact: z.string(),
      driverName: z.string(),
      driverContact: z.string(),
      itineraries: z.object({
        title: z.string(),
        description: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      }).array().optional(),
    })
});
export const updateTourVoucherSchema = z.object({
  body:
    z.object({
      id: z.string().min(1, {
        message: "Invalid ID"
      }),
      tourGuide: z.string(),
      remarks: z.string().optional(),
      tourContact: z.string(),
      driverName: z.string(),
      driverContact: z.string(),
      itineraries: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      }).array().optional(),
    })
});
