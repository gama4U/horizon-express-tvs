import prisma from "../utils/db.utils"

export const deletePackageAirfareByPackageId = async(id: string) => {
  return await prisma.packageAirfare.deleteMany({
    where: {
      packageId: id
    }
  })
}