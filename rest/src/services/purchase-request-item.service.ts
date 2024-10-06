import prisma from "../../prisma/db";

export async function deletePurchaseRequestItems(purchaseRequestId: string) {
  return await prisma.purchaseRequestOrderItem.deleteMany({
    where: {
      purchaseRequestOrderId: purchaseRequestId
    }
  });
}
