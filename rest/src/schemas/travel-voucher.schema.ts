import { TravelType } from "@prisma/client";
import { z } from "zod";

export const createTravelVoucherSchema = z.object({
  body:
    z.object({
      type: z.enum([TravelType.AIRLINES, TravelType.SHIPPING]),
      transactionId: z.string().min(1, {
        message: "Invalid ID"
      }),
      shipping: z.object({
        voyageNumber: z.string(),
        dateOfTravel: z.string(),
        name: z.string(),
        origin: z.string()
      }).optional(),
      airlines: z.object({
        name: z.string(),
        code: z.string(),
        origin: z.string(),
        destination: z.string(),
        etd: z.string(),
        eta: z.string(),
      }).optional()
    })
});

