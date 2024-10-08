import { Prisma } from "@prisma/client";
import prisma from "../../prisma/db";
import moment from "moment";

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


interface IUpdateTransaction {
  id: string;
  salesAgreementId?: string;
  purchaseOrderId?: string;
}

export async function updateTransaction({ id, ...data }: IUpdateTransaction) {
  if (data.salesAgreementId) {
    const salesAgreementReferencedAlready = await prisma.transaction.findFirst({
      where: {
        salesAgreementId: data.salesAgreementId,
        id: { not: id },
      },
    });

    if (salesAgreementReferencedAlready) {
      throw new Error('Sales Agreement is already attached to another transaction.');
    }
  }

  if (data.purchaseOrderId) {
    const purchaseOrderReferencedAlready = await prisma.transaction.findFirst({
      where: {
        purchaseOrderId: data.purchaseOrderId,
        id: { not: id },
      },
    });

    if (purchaseOrderReferencedAlready) {
      throw new Error('Purchase Order is already attached in another transaction.');
    }
  }

  return await prisma.transaction.update({
    where: { id },
    data: {
      ...(data.salesAgreementId && { salesAgreementId: data.salesAgreementId }),
      ...(data.purchaseOrderId && { purchaseOrderId: data.purchaseOrderId }),
    },
  });
}

export async function deleteTransaction(id: string) {
  return await prisma.transaction.delete({
    where: { id },
  })
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
      transportVoucher: {
        include: {
          itineraries: true
        }
      },
      salesAgreement: {
        include: {
          creator: true
        }
      },
      purchaseOrder: {
        include: {
          creator: true
        }
      }
    }
  })
}
export interface IFetchTransactions {
  skip?: number;
  take?: number;
  search?: string;
  travel?: boolean;
  accommodation?: boolean;
  tour?: boolean;
  transport?: boolean;
}


export async function fetchTransactions({ skip, take, search, travel, accommodation, tour, transport }: IFetchTransactions) {
  let whereInput: Prisma.TransactionWhereInput = {};

  if (search) {
    whereInput = {
      OR: [
        { lead: { firstName: { contains: search, mode: 'insensitive' } } },
        { lead: { lastName: { contains: search, mode: 'insensitive' } } },
        { id: { contains: search, mode: "insensitive" } },
      ],
    };
  }

  if (travel) {
    whereInput.travelVoucher = { some: {} };
  }
  if (accommodation) {
    whereInput.accommodationVoucher = { some: {} };
  }
  if (tour) {
    whereInput.tourVoucher = { some: {} };
  }
  if (transport) {
    whereInput.transportVoucher = { some: {} };
  }

  const findTransaction = prisma.transaction.findMany({
    where: {
      ...whereInput,
    },
    include: {
      lead: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
          userType: true,
        },
      },
      salesAgreement: true,
      purchaseOrder: true,
      tourVoucher: true,
      travelVoucher: true,
      accommodationVoucher: true,
      transportVoucher: true,
    },
    skip: skip ?? 0,
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const countTransactions = prisma.transaction.count({
    where: {
      ...whereInput,
    },
  });

  const [transactions, total] = await prisma.$transaction([findTransaction, countTransactions]);

  const enrichedTransactions = transactions.map((transaction) => {
    const travelVoucherCount = transaction.travelVoucher.length;
    const accommodationVoucherCount = transaction.accommodationVoucher.length;
    const tourVoucherCount = transaction.tourVoucher.length;
    const transportVoucherCount = transaction.transportVoucher.length;

    return {
      ...transaction,
      voucherCounts: {
        travel: travelVoucherCount,
        accommodation: accommodationVoucherCount,
        tour: tourVoucherCount,
        transport: transportVoucherCount,
      },
    };
  });

  return { transactions: enrichedTransactions, total };
}




export async function fetchTransactionSummary(startDate: Date, endDate: Date) {
  const oneWeekAgo = moment().subtract(7, 'days').startOf('day').toDate();

  const [total, since7days, transactions] = await Promise.all([
    prisma.transaction.count(),
    prisma.transaction.count({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    }),
    prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        travelVoucher: true,
        accommodationVoucher: true,
        tourVoucher: true,
        transportVoucher: true,
      },
    }),
  ]);

  const enrichedTransactions = transactions.map((transaction) => {
    const travelVoucherCount = transaction.travelVoucher.length;
    const accommodationVoucherCount = transaction.accommodationVoucher.length;
    const tourVoucherCount = transaction.tourVoucher.length;
    const transportVoucherCount = transaction.transportVoucher.length;

    return {
      ...transaction,
      voucherCounts: {
        travel: travelVoucherCount,
        accommodation: accommodationVoucherCount,
        tour: tourVoucherCount,
        transport: transportVoucherCount,
      },
    };
  });

  const totalVoucherCounts = {
    travel: 0,
    accommodation: 0,
    tour: 0,
    transport: 0,
  };

  enrichedTransactions.forEach((transaction) => {
    totalVoucherCounts.travel += transaction.travelVoucher.length;
    totalVoucherCounts.accommodation += transaction.accommodationVoucher.length;
    totalVoucherCounts.tour += transaction.tourVoucher.length;
    totalVoucherCounts.transport += transaction.transportVoucher.length;
  });



  return { since7days, total, enrichedTransactions, totalVoucherCounts };
}



