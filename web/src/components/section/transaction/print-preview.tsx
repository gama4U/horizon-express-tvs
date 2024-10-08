import { Printer } from 'lucide-react';
import { format } from "date-fns";
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ITransaction } from '@/interfaces/transaction.interface';
import { AccommodationType } from '@/interfaces/accommodation.interface';
import { TransportServiceType, VehicleType } from '@/interfaces/transport.interface';
import logo from '../../../assets/logo.png'

interface Props {
  data: ITransaction;
}

export default function PrintPreview({ data }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="h-[50px] px-4 flex items-center justify-between">
        <h1 className="text-xs text-muted-foreground italic">Print preview</h1>
        <Button onClick={() => reactToPrintFn()} size={'sm'} className="gap-1">
          <Printer size={16} />
          <span>Print</span>
        </Button>
      </div>
      <Separator />
      <div ref={contentRef} className="p-4 min-h-[900px] space-y-4">
        <div className='flex justify-center items-center gap-x-4'>
          <img src={logo} className='object-contain w-[80px] h-[80px]' />
          <div className="text-center text-muted-foreground">
            <h1 className="text-lg font-semibold">HORIZON EXPRESS TRAVEL AND TOURS INC.</h1>
            <h3 className="text-xs font-semibold">Unit 601 The Meridian, Golam Drive Kasambagan, Cebu City 6000</h3>
            <div className="flex flex-col text-xs">
              <span>Email: accounting.cebu@horizonexpress.ph</span>
              <span>Contact Number: 09171871163</span>
            </div>
          </div>
        </div>

        <div className="border-b-2 my-4"></div>

        <div className="p-2 space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2 text-xs justify-between">
              <div className='flex row gap-x-2'>
                <span className="font-semibold">Lead Name:</span>
                <span>{data.lead.firstName} {data.lead.lastName}</span>
              </div>
              <div className='flex row gap-x-2'>
                <span className="font-semibold">Date Created:</span>
                <span>{format(new Date(data?.createdAt ?? new Date), 'MMMM d, yyyy')}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <span className="font-semibold">Voucher #:</span>
              <span>{data.id}</span>
            </div>
            {data.travelVoucher && data.travelVoucher.length > 0 && (
              <div className="border-t pt-4">
                <>
                  <hr className="border-t-2 border-gray-500 my-2 border-dashed" />
                  <h3 className="text-sm tracking-[18px] text-center font-medium uppercase">Travel</h3>
                  <hr className="border-t-2 border-gray-500 my-2 border-dashed" />
                </>
                {data.travelVoucher.map((voucher, index) => (
                  <>
                    <p className='mb-1 text-xs underline'>Travel #{index + 1}</p>
                    <div key={voucher.id} className="text-xs grid grid-cols-2">
                      <div>
                        <p>Name: {voucher.airline?.name}</p>
                        <p>Code: {voucher.airline?.code}</p>
                      </div>
                      <div>
                        <p>Origin: {voucher.airline?.origin}</p>
                        <p>Destination: {voucher.airline?.destination}</p>
                      </div>
                      <div>
                        <p>ETD: {format(new Date(voucher.airline?.etd ?? new Date()), "MMMM d, yyyy")}</p>
                      </div>
                      <div>
                        <p>ETA: {format(new Date(voucher.airline?.eta ?? new Date()), "MMMM d, yyyy")}</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}

            {data.accommodationVoucher && data.accommodationVoucher.length > 0 && (
              <div className="border-t pt-4">
                <>
                  <hr className="border-t-2 border-gray-500 my-2 border-dashed" />
                  <h3 className="text-sm tracking-[18px] text-center font-medium uppercase">Accommodation</h3>
                  <hr className="border-t-2 border-gray-500 my-2 border-dashed" />
                </>
                {data.accommodationVoucher.map((accommodation, index) => (
                  <>
                    <p className='mb-1 text-xs underline'>Accommodation #{index + 1}</p>
                    <div key={accommodation.id} className="text-xs grid grid-cols-2">
                      <div>
                        <p>Name: {accommodation.name}</p>
                        <p>Type: {AccommodationType[accommodation.type]}</p>
                      </div>
                      <div>
                        <p>Check-in: {format(new Date(accommodation.checkinDate), "MMMM d, yyyy")}</p>
                        <p>Check-out: {format(new Date(accommodation.checkoutDate), "MMMM d, yyyy")}</p>
                      </div>
                      <div>
                        <p>Confirmation Number: {accommodation.hotelConfirmationNumber}</p>
                      </div>
                      <div>
                        {accommodation.remarks && <p>Remarks: {accommodation.remarks}</p>}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}
            {data.tourVoucher && data.tourVoucher.length > 0 && (
              <div className="border-t pt-4">
                <>
                  <hr className="border-t-2 border-gray-500 my-2 border-dashed" />
                  <h3 className="uppercase text-sm tracking-[18px] text-center font-medium">Tour</h3>
                  <hr className="border-t-2 border-gray-500 my-2 border-dashed" />
                </>

                {data.tourVoucher.map((tour, index) => (
                  <>
                    <p className='mb-1 text-xs underline'>Tour #{index + 1}</p>
                    <div key={tour.id} className="text-xs grid grid-cols-2">
                      <div>
                        <p>Tour: {tour.tour}</p>
                        <p>Tour Guide: {tour.tourGuide}</p>
                      </div>
                      <div>
                        <p>Tour Contact: {tour.tourContact}</p>
                        <p>Driver: {tour.driverName}</p>
                      </div>
                      <div>
                        <p>Driver Contact: {tour.driverContact}</p>
                      </div>
                      {tour.itineraries.length > 0 && (
                        <div className="col-span-2">
                          <h4 className="font-semibold">Itineraries</h4>
                          <table className="w-full text-left text-xs border">
                            <thead>
                              <tr>
                                <th className="border px-2 py-1">Title</th>
                                <th className="border px-2 py-1">Description</th>
                                <th className="border px-2 py-1">Start Date</th>
                                <th className="border px-2 py-1">End Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tour.itineraries.map(itinerary => (
                                <tr key={itinerary.id}>
                                  <td className="border px-2 py-1">{itinerary.title}</td>
                                  <td className="border px-2 py-1">{itinerary.description}</td>
                                  <td className="border px-2 py-1">{format(new Date(itinerary.startDate), "MMMM d, yyyy")}</td>
                                  <td className="border px-2 py-1">{format(new Date(itinerary.endDate), "MMMM d, yyyy")}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </>))}
              </div>
            )}
            {data.transportVoucher && data.transportVoucher.length > 0 && (
              <div className="border-t pt-4">
                <>
                  <hr className="border-t-2 border-gray-500 my-2 border-dashed" />
                  <h3 className="uppercase text-sm tracking-[18px] text-center font-medium">Transport</h3>
                  <hr className="border-t-2 border-gray-500 my-2 border-dashed" />
                </>

                {data.transportVoucher.map((transport, index) => (
                  <>
                    <p className='mb-1 text-xs underline'>Transport #{index + 1}</p>

                    <div key={transport.id} className="text-xs grid grid-cols-2 gap-4">
                      <div>
                        <p>Driver: {transport.driverName}</p>
                        <p>Contact: {transport.driverContact}</p>
                      </div>
                      <div>
                        <p>Vehicle Plate: {transport.vehiclePlateNumber}</p>
                        <p>Service Type: {TransportServiceType[transport.serviceType]}</p>
                      </div>
                      <div>
                        <p>Vehicle Type: {VehicleType[transport.vehicleType]}</p>
                      </div>
                      {transport.remarks && <div><p>Remarks: {transport.remarks}</p></div>}
                      {transport.itineraries.length > 0 && (
                        <div className="col-span-2">
                          <h4 className="font-semibold">Itineraries</h4>
                          <table className="w-full text-left text-xs border">
                            <thead>
                              <tr>
                                <th className="border px-2 py-1">Title</th>
                                <th className="border px-2 py-1">Description</th>
                                <th className="border px-2 py-1">Start Date</th>
                                <th className="border px-2 py-1">End Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {transport.itineraries.map(itinerary => (
                                <tr key={itinerary.id}>
                                  <td className="border px-2 py-1">{itinerary.title}</td>
                                  <td className="border px-2 py-1">{itinerary.description}</td>
                                  <td className="border px-2 py-1">{format(new Date(itinerary.startDate), "MMMM d, yyyy")}</td>
                                  <td className="border px-2 py-1">{format(new Date(itinerary.endDate), "MMMM d, yyyy")}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
