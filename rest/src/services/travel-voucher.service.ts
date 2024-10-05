import prisma from "../../prisma/db";
import { ICreateAirlines, ICreateShipping, ICreateTravelVoucher } from "../interfaces/travel-voucher.interface";



export async function createTravelVoucher(data: ICreateTravelVoucher) {
  return await prisma.travel.create({
    data
  })
}
export async function createAirlines(data: ICreateAirlines) {
  return await prisma.airlines.create({
    data
  })
}
export async function createShipping(data: ICreateShipping) {
  return await prisma.shipping.create({
    data
  })
}
