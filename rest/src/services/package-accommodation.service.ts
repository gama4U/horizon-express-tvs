import prisma from "../utils/db.utils"

export const deletePackageAccommodationByPackageId = async(id: string) => {
  return await prisma.packageAccommodation.deleteMany({
    where: {
      packageId: id
    }
  })
}