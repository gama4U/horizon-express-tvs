import { fetchPurchaseRequestSummary } from "@/api/queries/purchase-request.queries";
import { fetchSalesAgreementSummary } from "@/api/queries/sales-agreements.queries";
import { fetchTransactionsSummary } from "@/api/queries/transaction";
import AnimatedDiv from "@/components/animated/Div";
import Loader from "@/components/animated/Loader";
import { DashboardCard } from "@/components/cards/admin";
import { TransactionChart } from "@/components/charts/bar-chart";
import { DatePickerWithRange } from "@/components/common/date-range-picker";
import TopBar from "@/components/section/topbar";
import { useAuth } from "@/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";
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
    queryFn: async () => await fetchSalesAgreementSummary(
    ),
  });
  const { data: purchaseRequests, isLoading: purchaseLoading } = useQuery({
    queryKey: ['purchase-request-summary'],
    queryFn: async () => await fetchPurchaseRequestSummary(
    ),
  });


  const handleDateChange = (range: DateRange | undefined) => {
    setSelectedDateRange(range);
  };

  const isLoading = transactionsLoading || salesLoading || purchaseLoading

  return (
    <div className="flex flex-col space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Good day, {session.user?.firstName}
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Overview of today's activities and transactions.</p>
        }
      />
      {isLoading &&
        <Loader isLoading={true} />}
      <div className="bg-white flex-1 rounded-lg overflow-hidden p-6">
        <AnimatedDiv animationType="FadeInFromUp" className="mt-4 lg:mt-0 w-full mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <DashboardCard title="Transactions" value={transactions?.total ?? 0} showRate={true} rate={transactions?.rate} shortLabel="Last 7 days" />
          <DashboardCard title="Sales Agreements" value={salesAgreements?.total ?? 0} showRate={true} rate={salesAgreements?.rate} shortLabel="Last 7 days" />
          <DashboardCard title="Purchase Requests" value={purchaseRequests?.total ?? 0} showRate={true} rate={purchaseRequests?.rate} shortLabel="Last 7 days" />
          <DashboardCard title="Memorandum" value={23} showRate={true} rate={Math.round(23 / 49 * 100)} shortLabel="Last 7 days" />
        </AnimatedDiv>

        <div className="flex flex-col gap-y-2 p-2 rounded-lg border-[1px]">
          <div className="w-full lg:w-1/3 flex lg:justify-start">
            <DatePickerWithRange onDateChange={handleDateChange} />
          </div>

          <div className="w-full flex flex-col lg:flex-col lg:justify-start items-start space-y-4 lg:space-y-0">
            <div className="w-full lg:w-2/3">
              {isLoading ? (
                <div className="w-full rounded-lg bg-white h-[100vh]"></div>
              ) : (
                <TransactionChart
                  enrichedTransactions={transactions?.enrichedTransactions ?? []}
                  selectedDateRange={selectedDateRange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
