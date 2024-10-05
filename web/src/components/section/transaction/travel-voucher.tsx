import { ITravelVoucher } from "../../../interfaces/travel.interface";
import { format } from 'date-fns';

interface TravelVoucherProps {
  travelVoucher: ITravelVoucher;
}

export default function TravelVoucher({ travelVoucher }: TravelVoucherProps) {

  console.log('tavl', travelVoucher)
  return (
    <div className="flex flex-col gap-y-4 p-4 md:p-6 lg:p-8 bg-white rounded-md shadow-md">

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
        <p className="text-sm md:text-base">Travel Type:</p>
        <p className="text-sm md:text-base font-medium">{travelVoucher.type}</p>
      </div>

      {travelVoucher?.airline && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">Airline Name:</p>
            <p className="text-sm md:text-base font-medium">{travelVoucher.airline.name ?? "N/A"}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">Airline Code:</p>
            <p className="text-sm md:text-base font-medium">{travelVoucher.airline.code ?? "N/A"}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">Origin:</p>
            <p className="text-sm md:text-base font-medium">{travelVoucher.airline.origin ?? "N/A"}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">Destination:</p>
            <p className="text-sm md:text-base font-medium">{travelVoucher.airline.destination ?? "N/A"}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">ETD:</p>
            <p className="text-sm md:text-base font-medium">{format(new Date(travelVoucher.airline.etd), 'MMMM d, yyyy')}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">ETA:</p>
            <p className="text-sm md:text-base font-medium">{format(new Date(travelVoucher.airline.eta), 'MMMM d, yyyy')}</p>
          </div>
        </div>
      )}

      {travelVoucher?.shipping && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">Shipping Name:</p>
            <p className="text-sm md:text-base font-medium">{travelVoucher.shipping.name ?? "N/A"}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">Voyage Number:</p>
            <p className="text-sm md:text-base font-medium">{travelVoucher.shipping.voyageNumber ?? "N/A"}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">Origin:</p>
            <p className="text-sm md:text-base font-medium">{travelVoucher.shipping.origin ?? "N/A"}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">Destination:</p>
            <p className="text-sm md:text-base font-medium">{travelVoucher.shipping.destination ?? "N/A"}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-2 gap-x-4">
            <p className="text-sm md:text-base">ETD:</p>
            <p className="text-sm md:text-base font-medium">{format(new Date(travelVoucher.shipping.dateOfTravel), 'MMMM d, yyyy')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
