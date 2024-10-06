import prisma from "../../prisma/db";

export interface ICreateTourVoucher {
  transactionId: string
  tourGuide: string
  tourContact: string
  driverName: string
  driverContact: string
  itineraries: ICreateItinerary[]
  remarks?: string
}
export interface IUpdateTourVoucher {
  id: string
  tourGuide: string
  tourContact: string
  driverName: string
  driverContact: string
  itineraries: IUpdateItinerary[]
  remarks?: string
}

export interface ICreateItinerary {
  tourId?: string
  transportId?: string
  title: string
  description: string
  startDate: Date
  endDate: Date
}
export interface IUpdateItinerary {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
}

export async function createTourVoucher(data: ICreateTourVoucher) {
  return await prisma.tour.create({
    data: {
      transactionId: data.transactionId,
      tourGuide: data.tourGuide,
      tourContact: data.tourContact,
      driverName: data.driverName,
      driverContact: data.driverContact,
      remarks: data.remarks,
    },
  });
}

export async function updateTourVoucher({ id, ...data }: IUpdateTourVoucher) {
  return await prisma.tour.update({
    where: { id },
    data: {
      tourGuide: data.tourGuide,
      tourContact: data.tourContact,
      driverName: data.driverName,
      driverContact: data.driverContact,
      remarks: data.remarks,
    },
  });
}

export async function createItinerary(data: ICreateItinerary) {
  return await prisma.itinerary.create({
    data: {
      id: data.tourId ?? data.transportId,
      ...data
    }
  })
}

export async function updateItinerary({ id, ...data }: IUpdateItinerary) {
  return await prisma.itinerary.update({
    where: { id },
    data
  })
}

