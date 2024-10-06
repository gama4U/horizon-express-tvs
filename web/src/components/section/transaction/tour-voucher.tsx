import { useState } from "react";
import { Separator } from "../../ui/separator";
import { format } from "date-fns";
import { EditAccommodationVoucherDialog } from "../../dialogs/transaction/accommodation-voucher/edit";
import { Button } from "../../ui/button";
import { Pencil } from "lucide-react";
import { ITourVoucher } from "../../../interfaces/tour.interface";

interface ITourVoucherProps {
  tourVoucher: ITourVoucher[];
}

export default function TourVoucher({ tourVoucher }: ITourVoucherProps) {

  const [tour, setTour] = useState<ITourVoucher>()
  const [openEditDialog, setOpenEditDialog] = useState(false)

  function handleEditAccommodation(selectedTour: ITourVoucher) {
    setOpenEditDialog(true)
    setTour(selectedTour)
  }

  return (
    <div className="flex flex-col gap-y-6 p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">
      {tourVoucher.map((voucher, index) => (
        <div key={index} className="border-4 border-dotted p-2 mb-2">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-semibold">Tour #{index + 1}</p>
            <Button variant="link" className="text-sm gap-x-2" onClick={() => handleEditAccommodation(voucher)}>
              Update
              <Pencil size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-sm font-medium">Tour Guide:</p>
              <p className="text-sm text-gray-700">{voucher.tourGuide}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-sm font-medium">Tour Guide Contact:</p>
              <p className="text-sm text-gray-700">{voucher.tourContact}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-sm font-medium">Driver Name:</p>
              <p className="text-sm text-gray-700">{voucher.driverName}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-sm font-medium">Driver Contact:</p>
              <p className="text-sm text-gray-700">{voucher.driverContact}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-sm font-medium">Remarks:</p>
              <p className="text-sm text-gray-700">{voucher.remarks ?? "N/A"}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            {voucher.itineraries?.map((itinerary, idx) => (
              <div key={idx} className="space-y-4">
                <p className="text-sm font-semibold">Itinerary #{idx + 1}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <p className="text-sm font-medium">Title:</p>
                  <p className="text-sm text-gray-700">{itinerary.title ?? "N/A"}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <p className="text-sm font-medium">Description:</p>
                  <p className="text-sm text-gray-700">{itinerary.description ?? "N/A"}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <p className="text-sm font-medium">Start Date:</p>
                  <p className="text-sm text-gray-700">{format(new Date(itinerary.startDate), "MMMM d, yyyy")}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <p className="text-sm font-medium">End Date:</p>
                  <p className="text-sm text-gray-700">{format(new Date(itinerary.endDate), "MMMM d, yyyy")}</p>
                </div>
              </div>
            ))}
          </div>

          {index < tourVoucher.length - 1 && <Separator className="my-6" />}
        </div>
      ))}

      {tour && (
        <EditAccommodationVoucherDialog
          selectedAccommodation={tour}
          setOpenDialog={setOpenEditDialog}
          openDialog={openEditDialog}
        />
      )}
    </div>
  );
}
