import { useState } from "react";
import { IAccommodationVoucher } from "../../../interfaces/accommodation.interface";
import { Separator } from "../../ui/separator";
import { format } from "date-fns";
import { EditAccommodationVoucherDialog } from "../../dialogs/transaction/accommodation-voucher/edit";
import { Button } from "../../ui/button";
import { Pencil } from "lucide-react";

interface IAccommodationVoucherProps {
  accommodationVoucher: IAccommodationVoucher[];
}

export default function AccommodationVoucher({ accommodationVoucher }: IAccommodationVoucherProps) {

  const [accommodation, setAccommodation] = useState<IAccommodationVoucher>()
  const [openEditDialog, setOpenEditDialog] = useState(false)

  function handleEditAccommodation(selectedAccommodation: IAccommodationVoucher) {
    setOpenEditDialog(true)
    setAccommodation(selectedAccommodation)
  }

  return (
    <div className="flex flex-col gap-y-2 p-4 md:p-6 lg:p-8 bg-white rounded-md shadow-md">
      {accommodationVoucher.map((voucher, index) => (
        <div key={index}>
          <div className="flex flex-row justify-between">
            <p className="text-xs font-medium">Accommodation #{index + 1}</p>
            <Button variant="link" className="text-xs gap-x-2" onClick={() => handleEditAccommodation(voucher)}>
              Update
              <Pencil size={12} />
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-1 gap-x-4">
            <p className="text-sm md:text-xs">Travel Type:</p>
            <p className="text-sm md:text-xs font-medium">{voucher.type}</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-1 gap-x-4">
            <p className="text-sm md:text-xs">Accommodation Name:</p>
            <p className="text-sm md:text-xs font-medium">{voucher.name ?? "N/A"}</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-1 gap-x-4">
            <p className="text-sm md:text-xs">Hotel Confirmation Number:</p>
            <p className="text-sm md:text-xs font-medium">{voucher.hotelConfirmationNumber ?? "N/A"}</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-1 gap-x-4">
            <p className="text-sm md:text-xs">ETD:</p>
            <p className="text-sm md:text-xs font-medium">
              {format(new Date(voucher.checkinDate), "MMMM d, yyyy")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-1 gap-x-4">
            <p className="text-sm md:text-xs">ETA:</p>
            <p className="text-sm md:text-xs font-medium">
              {format(new Date(voucher.checkoutDate), "MMMM d, yyyy")}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-1 gap-x-4">
            <p className="text-sm md:text-xs">Remarks:</p>
            <p className="text-sm md:text-xs font-medium">{voucher.remarks ?? "N/A"}</p>
          </div>
          {index < accommodationVoucher.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
      {accommodation &&
        <EditAccommodationVoucherDialog selectedAccommodation={accommodation} setOpenDialog={setOpenEditDialog} openDialog={openEditDialog} />
      }
    </div>
  );
}
