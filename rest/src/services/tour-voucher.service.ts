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
  tourId: string
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
      itineraries: {
        create: data.itineraries.map(itinerary => ({
          title: itinerary.title,
          description: itinerary.description,
          startDate: itinerary.startDate,
          endDate: itinerary.endDate,
        })),
      },
    },
  });
}

export async function updateTourVoucher(id: string, data: IUpdateTourVoucher) {
  return await prisma.tour.update({
    where: { id },
    data: {
      tourGuide: data.tourGuide,
      tourContact: data.tourContact,
      driverName: data.driverName,
      driverContact: data.driverContact,
      remarks: data.remarks,
      itineraries: {
        upsert: data.itineraries.map(itinerary => ({
          where: { id: itinerary.id },
          update: {
            title: itinerary.title,
            description: itinerary.description,
            startDate: itinerary.startDate,
            endDate: itinerary.endDate,
          },
          create: {
            title: itinerary.title,
            description: itinerary.description,
            startDate: itinerary.startDate,
            endDate: itinerary.endDate,
          },
        })),
      },
    },
  });
}

