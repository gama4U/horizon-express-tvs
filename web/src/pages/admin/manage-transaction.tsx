import { useParams } from "react-router-dom";
import TopBar from "../../components/section/topbar";
import { useQuery } from "@tanstack/react-query";
import { fetchTransaction } from "../../api/queries/transaction";
import TravelVoucher from "../../components/section/transaction/travel-voucher";
import AddTravelVoucherDialog from "../../components/dialogs/transaction/travel-voucher/add";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Car, Hotel, MapPin, PlaneTakeoff } from "lucide-react";
import Loader from "../../components/animated/Loader";
import AddAccommodationVoucherDialog from "../../components/dialogs/transaction/accommodation-voucher/add";
import AccommodationVoucher from "../../components/section/transaction/accommodation-voucher";
import TourVoucher from "../../components/section/transaction/tour-voucher";
import AddTourVoucherDialog from "../../components/dialogs/transaction/tour-voucher/add";
import AddTransportVoucherDialog from "../../components/dialogs/transaction/transport-voucher/add";
import TransportVoucher from "../../components/section/transaction/transport-voucher";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { tabs } from "@/components/section/transaction/tabs";


export default function ManageTransaction() {
  const { id } = useParams();
  const [openAddTravelDialog, setOpenAddTravelDialog] = useState(false);
  const [openAddAccommodationDialog, setOpenAddAccommodationDialog] = useState(false);
  const [openAddTourDialog, setOpenAddTourDialog] = useState(false);
  const [openAddTransportDialog, setOpenAddTransportDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("horizon");
  const [previousTab, setPreviousTab] = useState<string>("");

  const handleTabChange = (newTab: string) => {
    setPreviousTab(activeTab);
    setActiveTab(newTab);
  };

  const direction = tabs.findIndex((tab) => tab.value === activeTab) > tabs.findIndex((tab) => tab.value === previousTab)
    ? 1
    : -1;
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const { data: transaction, isLoading } = useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      if (!id) return null;
      return await fetchTransaction({ id });
    },
    enabled: !!id,
  });


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
          <>
            <div className="flex flex-col space-y-2 w-[50%] p-2 bg-white rounded-lg h-full">
              <Tabs defaultValue={tabs[0].value} className="z-0">
                <TabsList className="w-full justify-start" defaultValue={tabs[0].value}>
                  {tabs.map((tab, index) => (
                    <TabsTrigger key={index} value={tab.value} className="flex flex-row gap-x-2 items-center"
                      onClick={() => handleTabChange(tab.value)}
                    >
                      <p className="text-sm">{tab.label}</p>
                      {tab.icon}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {tabs.map((tab, index) => (
                  <TabsContent key={index} value={tab.value} className="relative p-2">
                    {activeTab === tab.value && (
                      <motion.div
                        key={tab.value}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4 }}
                      >
                        {tab.value === "travel" && (
                          <>
                            <div className="flex flex-row justify-end items-center">
                              <Button
                                variant="outline"
                                className="text-xs gap-x-2 text-primary"
                                onClick={() => setOpenAddTravelDialog(true)}
                              >
                                Add
                                <PlaneTakeoff />
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
                        )}

                        {tab.value === "accommodation" && (
                          <>
                            <div className="flex flex-row justify-end items-center">
                              <Button
                                variant="outline"
                                className="text-xs gap-x-2 text-primary"
                                onClick={() => setOpenAddAccommodationDialog(true)}
                              >
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
                        )}

                        {tab.value === "tour" && (
                          <>
                            <div className="flex flex-row justify-end items-center">
                              <Button
                                variant="outline"
                                className="text-xs text-primary gap-x-2"
                                onClick={() => setOpenAddTourDialog(true)}
                              >
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
                        )}

                        {tab.value === "transport" && (
                          <>
                            <div className="flex flex-row justify-end items-center">
                              <Button
                                variant="outline"
                                className="text-xs text-primary gap-x-2"
                                onClick={() => setOpenAddTransportDialog(true)}
                              >
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
                        )}
                      </motion.div>
                    )}
                  </TabsContent>
                ))}              </Tabs>
            </div>
            <div className="w-[50%]"></div>
          </>
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
