import { useParams } from "react-router-dom"
import TopBar from "../../../components/section/topbar";
import { useQuery } from "@tanstack/react-query";
import { fetchSalesAgreement } from "../../../api/queries/sales-agreements";
import { Loader2, Pencil, Plus } from "lucide-react";
import ClientTypeBadge from "../../../components/badges/client-type";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

export default function SalesAgreementDetails() {
  const {id} = useParams();

  const {data, isLoading} = useQuery({
    queryKey: ['sales-agreement-details', id],
    queryFn: async () => {
      if (!id) return;
      return await fetchSalesAgreement(id)
    },
  });

  return (
    <div className="space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Sales agreement details
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">
            Manage sales agreement details here
          </p>
        }
      />
      <div className="w-full flex gap-x-2 rounded-lg">
        {data ? (
          <>
            <section className="w-full bg-white rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h1 className="text-[12px] font-semibold">
                  Details
                </h1>
                <Button size={'icon'} variant={'ghost'} className="text-primary">
                  <Pencil size={16}/>
                </Button>
              </div>
              <Separator className="my-2 bg-slate-200"/>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-[10px]">
                    Creator
                  </span>
                  <h3 className="text-[12px]">
                    {`${data.creator.firstName} ${data.creator.lastName}`}
                  </h3>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px]">
                    Ser. no.
                  </span>
                  <h3 className="text-[12px]">
                    {data.serialNumber}
                  </h3>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-[10px]">
                    Type of client
                  </span>
                  <ClientTypeBadge
                    value={data.typeOfClient} 
                  />
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px]">
                    Client name
                  </span>
                  <h3 className="text-[12px]">
                    {data.clientName}
                  </h3>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-[10px]">
                    Prepared by
                  </span>
                  <h3 className="text-[12px]">
                    {data.preparedBy}
                  </h3>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-[10px]">
                    Approved by
                  </span>
                  <h3 className="text-[12px]">
                    {data.approvedBy}
                  </h3>
                </div>
              </div>
              <div className="border border-slate-200 p-2 rounded-lg mt-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-[12px]">
                    Sales agreement items
                  </h1>
                  <Button size={'icon'} variant={'ghost'} className="text-primary">
                    <Plus size={18}/>
                  </Button>
                </div>
              </div>
            </section>
            <section className="w-full bg-white rounded-lg p-2">
              adsfasf
            </section>
          </>
        ) : (
          <div className="h-[300px] bg-white w-full text-[12px] text-muted-foreground flex items-center justify-center">
            {isLoading
              ? (
                <div className="flex gap-2">
                  <Loader2 size={18} className="animate-spin"/>
                  <span>Loading</span>
                </div>
              )
              : 'No data found'
            }
          </div>
        )}
      </div>
    </div>
  )
}
