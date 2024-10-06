import { useParams } from "react-router-dom";
import TopBar from "../../components/section/topbar";
import { useQuery } from "@tanstack/react-query";
import { fetchTransaction } from "../../api/queries/transaction";
import TravelVoucher from "../../components/section/transaction/travel-voucher";
import AddTravelVoucherDialog from "../../components/dialogs/transaction/travel-voucher/add";
import { Separator } from "../../components/ui/separator";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Hotel, Pencil, PlaneTakeoff } from "lucide-react";
import EditTravelVoucherDialog from "../../components/dialogs/transaction/travel-voucher/edit";
import Loader from "../../components/animated/Loader";
import { AddAccommodationVoucherDialog } from "../../components/dialogs/transaction/accommodation-voucher/add";
import AccommodationVoucher from "../../components/section/transaction/accommodation-voucher";

export default function ManageTransaction() {
  const { id } = useParams();
  const [openAddTravelDialog, setOpenAddTravelDialog] = useState(false);
  const [openAddAccommodationDialog, setOpenAddAccommodationDialog] = useState(false);
  const [openEditTravelDialog, setOpenEditTravelDialog] = useState(false);

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

      <div className="bg-white  flex-1  flex-col">
        {isLoading ?
          <Loader isLoading label="Fetching transaction details" />
          :
          <>
            <div className="flex flex-col space-y-2 w-[50%]  p-4">
              <>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xs font-medium">Travel Voucher</p>
                  {!transaction?.travelVoucher ? (
                    <Button className="text-xs gap-x-2" onClick={() => setOpenAddTravelDialog(true)}>
                      Add
                      <PlaneTakeoff />
                    </Button>
                  ) : (
                    <Button className="text-xs gap-x-2" onClick={() => setOpenEditTravelDialog(true)}>
                      Update
                      <Pencil />
                    </Button>
                  )}
                </div>

                {transaction?.travelVoucher ? (
                  <TravelVoucher travelVoucher={transaction?.travelVoucher} />
                ) : (
                  <div className="flex justify-center p-5">
                    <p className="text-gray-400 text-xs">Transaction does not include a travel voucher.</p>
                  </div>
                )}

              </>
              <>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xs font-medium">Accommodation Voucher</p>
                  <Button className="text-xs gap-x-2" onClick={() => setOpenAddAccommodationDialog(true)}>
                    Add
                    <Hotel />
                  </Button>
                </div>
                {transaction?.accommodationVoucher ? (
                  <AccommodationVoucher accommodationVoucher={transaction?.accommodationVoucher} />
                ) : (
                  <div className="flex justify-center p-5">
                    <p className="text-gray-400 text-xs">Transaction does not include an accommodation voucher.</p>
                  </div>
                )}
              </>
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

      {transaction?.travelVoucher && (
        <EditTravelVoucherDialog
          travelVoucherData={transaction?.travelVoucher}
          id={String(transaction?.travelVoucher?.id)}
          openDialog={openEditTravelDialog}
          setOpenDialog={setOpenEditTravelDialog}
        />
      )}
      <AddAccommodationVoucherDialog
        transactionId={String(id)}
        openDialog={openAddAccommodationDialog}
        setOpenDialog={setOpenAddAccommodationDialog}
      />

    </div>
  );
}
