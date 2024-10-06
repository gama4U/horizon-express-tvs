import { useParams } from "react-router-dom";
import TopBar from "@/components/section/topbar";
import { useQuery } from "@tanstack/react-query";
import { fetchTransaction } from "@/api/queries/transaction";
import TravelVoucher from "@/components/section/transaction/travel-voucher";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookLock, Car, Hotel, MapPin, MapPinned, Plane, PlaneIcon } from "lucide-react";
import Loader from "@/components/animated/Loader";
import AddAccommodationVoucherDialog from "@/components/dialogs/transaction/accommodation-voucher/add";
import AccommodationVoucher from "@/components/section/transaction/accommodation-voucher";
import TourVoucher from "@/components/section/transaction/tour-voucher";
import AddTravelVoucherDialog from "@/components/dialogs/transaction/travel-voucher/add";
import AddTransportVoucherDialog from "@/components/dialogs/transaction/transport-voucher/add";
import TransportVoucher from "@/components/section/transaction/transport-voucher";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import AddTourVoucherDialog from "@/components/dialogs/transaction/tour-voucher/add";
import PrintPreview from "@/components/section/transaction/print-preview";

export default function ManageTransaction() {
  const { id } = useParams();
  const [openAddTravelDialog, setOpenAddTravelDialog] = useState(false);
  const [openAddAccommodationDialog, setOpenAddAccommodationDialog] = useState(false);
  const [openAddTourDialog, setOpenAddTourDialog] = useState(false);
  const [openAddTransportDialog, setOpenAddTransportDialog] = useState(false);

  const { data: transaction, isLoading } = useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      if (!id) return null;
      return await fetchTransaction({ id });
    },
    enabled: !!id,
  });

  const tabs = [
    {
      label: "Horizon Only",
      value: "horizon",
      icon: <BookLock size={14} />
    },
    {
      label: "Travel",
      value: "travel",
      icon: <Plane size={14} />
    },
    {
      label: "Accommodation",
      value: "accommodation",
      icon: <Hotel size={14} />
    },
    {
      label: "Tour",
      value: "tour",
      icon: <MapPinned size={14} />
    },
    {
      label: "Transportation",
      value: "transport",
      icon: <Car size={14} />
    },
  ]

  return (
    <div className="h-screen w-full flex flex-col space-y-2">
      <TopBar
        showBackButton
        LeftSideHeader={<p className="text-sm">Manage transaction</p>}
        LeftSideSubHeader={<p className="text-primary text-xs">Transaction ID: {id}</p>}
      />

      <div className="bg-green-100 flex-1  flex-col">
        {isLoading ?
          <Loader isLoading label="Fetching transaction details" />
          :
          <div className="flex flex-row justify-between gap-x-2">
            <div className="flex flex-col space-y-2 w-full h-screen p-4 bg-white rounded-lg">
              <Tabs defaultValue={tabs[0].value} className="">
                <TabsList className="grid w-full grid-cols-5">
                  {tabs.map((tab, index) => (
                    <TabsTrigger key={index} value={tab.value} className="flex flex-row gap-x-2 items-center">
                      <p className="text-sm">{tab.label}</p>
                      {tab.icon}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value={tabs[0].value}>
                </TabsContent>
                <TabsContent value={tabs[1].value}>
                  <>
                    <div className="flex flex-row justify-end items-center">
                      <Button variant="outline" className="text-xs gap-x-2 text-primary" onClick={() => setOpenAddTravelDialog(true)}>
                        Add
                        <PlaneIcon />
                      </Button>
                    </div>
                    {transaction?.travelVoucher && transaction.travelVoucher.length > 0 ? (
                      <TravelVoucher travelVoucher={transaction?.travelVoucher} />
                    ) : (
                      <div className="flex justify-center p-5">
                        <p className="text-gray-400 text-xs">Transaction does not include any travel voucher.</p>
                      </div>
                    )}
                  </>

                </TabsContent>
                <TabsContent value={tabs[2].value}>
                  <>
                    <div className="flex flex-row justify-end items-center">
                      <Button variant="outline" className="text-xs gap-x-2 text-primary" onClick={() => setOpenAddAccommodationDialog(true)}>
                        Add
                        <Hotel />
                      </Button>
                    </div>
                    {transaction?.accommodationVoucher && transaction.accommodationVoucher.length > 0 ? (
                      <AccommodationVoucher accommodationVoucher={transaction?.accommodationVoucher} />
                    ) : (
                      <div className="flex justify-center p-5">
                        <p className="text-gray-400 text-xs">Transaction does not include any accommodation voucher.</p>
                      </div>
                    )}
                  </>

                </TabsContent>
                <TabsContent value={tabs[3].value}>
                  <>
                    <div className="flex flex-row justify-end items-center">
                      <Button variant="outline" className="text-xs text-primary gap-x-2" onClick={() => setOpenAddTourDialog(true)}>
                        Add
                        <MapPin />
                      </Button>
                    </div>
                    {transaction?.tourVoucher && transaction.tourVoucher.length > 0 ? (
                      <TourVoucher tourVoucher={transaction.tourVoucher} />
                    ) : (
                      <div className="flex justify-center p-5">
                        <p className="text-gray-400 text-xs">Transaction does not include any tour voucher.</p>
                      </div>
                    )}
                  </>
                </TabsContent>
                <TabsContent value={tabs[4].value}>
                  <>
                    <div className="flex flex-row justify-end items-center">
                      <Button variant="outline" className="text-xs text-primary gap-x-2" onClick={() => setOpenAddTransportDialog(true)}>
                        Add
                        <Car />
                      </Button>
                    </div>
                    {transaction?.transportVoucher && transaction.transportVoucher.length > 0 ? (
                      <TransportVoucher transportVoucher={transaction.transportVoucher} />
                    ) : (
                      <div className="flex justify-center p-5">
                        <p className="text-gray-400 text-xs">Transaction does not include any transport voucher.</p>
                      </div>
                    )}
                  </>
                </TabsContent>
              </Tabs>

            </div>
            <div className="w-full h-screen bg-white rounded-lg overflow-clip">
              {transaction &&
                <PrintPreview data={transaction} />}
            </div>
          </div>
        }
      </div>

      <AddTravelVoucherDialog
        transactionId={String(id)}
        openDialog={openAddTravelDialog}
        setOpenDialog={setOpenAddTravelDialog}
      />
      <AddAccommodationVoucherDialog
        transactionId={String(id)}
        openDialog={openAddAccommodationDialog}
        setOpenDialog={setOpenAddAccommodationDialog}
      />
      <AddTourVoucherDialog
        transactionId={String(id)}
        openDialog={openAddTourDialog}
        setOpenDialog={setOpenAddTourDialog}
      />
      <AddTransportVoucherDialog
        transactionId={String(id)}
        openDialog={openAddTransportDialog}
        setOpenDialog={setOpenAddTransportDialog}
      />
    </div>
  );
}
