import { useParams } from "react-router-dom"
import TopBar from "../../../components/section/topbar";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import { fetchPurchaseRequestOrder } from "@/api/queries/purchase-request.queries";
import PurchaseRequestInfo from "@/components/section/purchase-request/info";

export default function PurchaseRequestDetails() {
  const {id} = useParams();

  const {data, isLoading} = useQuery({
    queryKey: ['purchase-request-details', id],
    queryFn: async () => {
      if (!id) return;
      return await fetchPurchaseRequestOrder(id)
    },
  });

  return (
    <div className="space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Purchase request order details
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">
            Manage purchase request order details here
          </p>
        }
      />
      <div className="w-full flex gap-x-2 rounded-lg">
        {data ? (
          <>
            <section className="w-full bg-white rounded-lg">
              <div className="h-[50px] flex px-4 justify-between items-center">
                <h1 className="text-[12px] font-semibold">
                  Details
                </h1>
                {/* <EditSalesAgreementDialog data={data}/> */}
              </div>
              <Separator className="bg-slate-200"/>
              <PurchaseRequestInfo data={data} />
              {/* <SalesAgreementItems 
                data={data.salesAgreementItems}
                salesAgreementId={data.id}
              /> */}
            </section>
            {/* <PrintPreview data={data}/> */}
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
