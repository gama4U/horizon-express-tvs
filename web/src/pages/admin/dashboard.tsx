import { fetchMemorandumSummary } from "@/api/queries/memorandums.query";
import { fetchPurchaseRequestSummary } from "@/api/queries/purchase-request.queries";
import { fetchSalesAgreementSummary } from "@/api/queries/sales-agreements.queries";
import { fetchRecentAcitvities, fetchTransactionsSummary } from "@/api/queries/transaction";
import AnimatedDiv from "@/components/animated/Div";
import Loader from "@/components/animated/Loader";
import { DashboardCard, RecentActivityCard } from "@/components/cards/admin";
import { TransactionChart } from "@/components/charts/bar-chart";
import { DatePickerWithRange } from "@/components/common/date-range-picker";
import TopBar from "@/components/section/topbar";
import { useAuth } from "@/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function Dashboard() {
  const { session } = useAuth();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>();

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['transactions-summary', selectedDateRange],
    queryFn: async () => await fetchTransactionsSummary({
      from: selectedDateRange?.from,
      to: selectedDateRange?.to
    }),
  });

  const { data: salesAgreements, isLoading: salesLoading } = useQuery({
    queryKey: ['sales-agreement-summary'],
    queryFn: async () => await fetchSalesAgreementSummary(),
  });

  const { data: purchaseRequests, isLoading: purchaseLoading } = useQuery({
    queryKey: ['purchase-request-summary'],
    queryFn: async () => await fetchPurchaseRequestSummary(),
  });

  const { data: memorandums, isLoading: memorandumsLoading } = useQuery({
    queryKey: ['memorandums-summary'],
    queryFn: async () => await fetchMemorandumSummary(),
  });

  const { data: recent, isLoading: recentLoading } = useQuery({
    queryKey: ['recent'],
    queryFn: async () => await fetchRecentAcitvities(),
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setSelectedDateRange(range);
  };

  // const handleRefetchRecentActivities = () => {
  //   refetch();
  // };

  const isLoading = transactionsLoading || salesLoading || purchaseLoading || memorandumsLoading || recentLoading;

  return (
    <div className="flex flex-col space-y-2 ">
      <TopBar
        LeftSideHeader={<p className="text-sm">Good day, {session.user?.firstName}</p>}
        LeftSideSubHeader={<p className="text-primary text-xs">Overview of today's activities and transactions.</p>}
      />
      {isLoading && <Loader isLoading={true} />}
      <div className="bg-white flex-1 rounded-lg overflow-hidden p-4 md:p-6">
        <AnimatedDiv animationType="FadeInFromUp" className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <DashboardCard title="Transactions" value={transactions?.total ?? 0} showRate={true} rate={transactions?.rate} shortLabel="Last 7 days" />
          <DashboardCard title="Sales Agreements" value={salesAgreements?.total ?? 0} showRate={true} rate={salesAgreements?.rate} shortLabel="Last 7 days" />
          <DashboardCard title="Purchase Requests" value={purchaseRequests?.total ?? 0} showRate={true} rate={purchaseRequests?.rate} shortLabel="Last 7 days" />
          <DashboardCard title="Memorandum" value={memorandums?.total ?? 0} showRate={true} rate={memorandums?.rate} shortLabel="Last 7 days" />
        </AnimatedDiv>

        <div className="flex flex-col md:flex-row gap-2 p-2  mt-2">
          <div className="flex-1 w-full">
            <DatePickerWithRange onDateChange={handleDateChange} />
            <div className="w-full flex flex-col lg:flex-row space-x-4 lg:justify-between items-start space-y-4 lg:space-y-0">
              <div className="w-full ">
                {isLoading ? (
                  <div className="w-full rounded-lg bg-white h-[300px] md:h-[400px]"></div>
                ) : (
                  <TransactionChart
                    enrichedTransactions={transactions?.enrichedTransactions ?? []}
                    selectedDateRange={selectedDateRange}
                  />
                )}
              </div>
            </div>
          </div>

          <AnimatedDiv className="h-auto w-[30%] rounded-lg p-2 border border-gray-200 flex flex-col" animationType="SlideInFromRight">
            <div className="flex flex-row justify-between items-center mb-2">
              <p className="font-medium text-md leading-none mb-2">Recent Activities</p>
            </div>
            {recentLoading ? (
              <div className="flex-1 flex justify-center items-center w-full">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <div className="h-[320px] overflow-y-auto">
                {recent?.map((item) => (
                  <RecentActivityCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </AnimatedDiv>
        </div>
      </div>
    </div>
  );
}
