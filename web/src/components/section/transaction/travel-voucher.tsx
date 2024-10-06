import { ITravelVoucher } from "../../../interfaces/travel.interface";
import { format } from 'date-fns';

interface TravelVoucherProps {
  travelVoucher: ITravelVoucher;
}

export default function TravelVoucher({ travelVoucher }: TravelVoucherProps) {

  return (
    <div className="flex flex-col gap-y-6 p-4 sm:p-6 lg:p-4 bg-white rounded-lg">

      <div className="border-2 border-dotted p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
          <p className="text-sm md:text-xs">Travel Type:</p>
          <p className="text-sm md:text-xsfont-medium">{travelVoucher.type}</p>
        </div>

        {travelVoucher?.airline && (
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">Airline Name:</p>
              <p className="text-sm md:text-xs font-medium">{travelVoucher.airline.name ?? "N/A"}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">Airline Code:</p>
              <p className="text-sm md:text-xs font-medium">{travelVoucher.airline.code ?? "N/A"}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">Origin:</p>
              <p className="text-sm md:text-xs font-medium">{travelVoucher.airline.origin ?? "N/A"}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">Destination:</p>
              <p className="text-sm md:text-xs font-medium">{travelVoucher.airline.destination ?? "N/A"}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">ETD:</p>
              <p className="text-sm md:text-xs font-medium">{format(new Date(travelVoucher.airline.etd), 'MMMM d, yyyy')}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">ETA:</p>
              <p className="text-sm md:text-xs font-medium">{format(new Date(travelVoucher.airline.eta), 'MMMM d, yyyy')}</p>
            </div>
          </div>
        )}

        {travelVoucher?.shipping && (
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">Shipping Name:</p>
              <p className="text-sm md:text-xs font-medium">{travelVoucher.shipping.name ?? "N/A"}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">Voyage Number:</p>
              <p className="text-sm md:text-xs font-medium">{travelVoucher.shipping.voyageNumber ?? "N/A"}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">Origin:</p>
              <p className="text-sm md:text-xs font-medium">{travelVoucher.shipping.origin ?? "N/A"}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">Destination:</p>
              <p className="text-sm md:text-xs font-medium">{travelVoucher.shipping.destination ?? "N/A"}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
              <p className="text-sm md:text-xs">ETD:</p>
              <p className="text-sm md:text-xs font-medium">{format(new Date(travelVoucher.shipping.dateOfTravel), 'MMMM d, yyyy')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
