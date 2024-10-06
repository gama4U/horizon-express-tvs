import { TransportServiceType, VehicleType } from "@prisma/client"
import prisma from "../../prisma/db";

export interface ICreateTransportVoucher {
  transactionId: string
  driverName: string
  driverContact: string
  remarks?: string
  vehiclePlateNumber: string
  serviceType: TransportServiceType
  vehicleType: VehicleType
}
export interface IUpdateTransportVoucher {
  id: string
  driverName: string
  driverContact: string
  remarks?: string
  vehiclePlateNumber: string
  serviceType: TransportServiceType
  vehicleType: VehicleType
}

export async function createTransportVoucher(data: ICreateTransportVoucher) {

  return await prisma.transportation.create({
    data
  })
}
export async function updateTransportVoucher({ id, ...data }: IUpdateTransportVoucher) {
  return await prisma.transportation.update({
    where: {
      id: id
    },
    data
  })
}
