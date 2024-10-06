import prisma from "../../prisma/db";

interface ICreateTransaction {
  leadId: string;
  salesAgreementId: string;
}
export async function createTransaction({ leadId, salesAgreementId }: ICreateTransaction) {
  return await prisma.transaction.create({
    data: {
      leadId,
      salesAgreementId
    }
  })
}

interface IFetchTransaction {
  id: string;
}

export async function fetchTransaction({ id }: IFetchTransaction) {
  return await prisma.transaction.findUnique({
    where: {
      id
    },
    include: {
      lead: true,
      tourVoucher: {
        include: {
          itineraries: true
        }
      },
      travelVoucher: {
        include: {
          airline: true,
          shipping: true
        }
      },
      accommodationVoucher: true,
      transportVoucher: true
    }
  })
}
