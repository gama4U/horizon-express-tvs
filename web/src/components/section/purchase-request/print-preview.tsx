import { Loader2, Printer, ThumbsUp } from 'lucide-react'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { IPurchaseRequestOrder, PaymentType, PurchaseRequestOrderType } from '@/interfaces/purchase-request.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { approvePurchaseRequestOrder } from '@/api/mutations/purchase-request..mutation';
import { useAuth } from '@/providers/auth-provider';
import { UserType } from '@/interfaces/user.interface';
import { formatCurrency } from '@/utils/currency.utils';
import logo from "../../../assets/logo.png"

interface Props {
  data: IPurchaseRequestOrder
}

const typeLabelMap: Record<PurchaseRequestOrderType, string> = {
  ACCOMMODATION: 'Accommodation',
  VISA: 'Visa',
  SHIPPING: 'Shipping',
  TRANSPORTATION_RENTAL: 'Transportation Rental',
  DOMESTIC_AIRLINE_TICKETING: 'Domestic Airline Ticketing',
  INTERNATIONAL_AIRLINE_TICKETING: 'International Airline Ticketing',
}

const paymentTypeLabelMap: Record<PaymentType, string> = {
  CASH: 'Cash',
  CHECK: 'Check',
}

export default function PrintPreview({ data }: Props) {
  const queryClient = useQueryClient();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { session: { user } } = useAuth();

  const { mutate: approveMutate, isPending: approving } = useMutation({
    mutationFn: async (id: string) => await approvePurchaseRequestOrder(id),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ['purchase-request-details'] })
      toast.success(data.message, {
        position: 'top-center',
        className: 'text-primary'
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: 'top-center',
        className: 'text-destructive'
      })
    },
  });

  const grandTotal = data.purchaseOrderItems.reduce((acc, item) => (acc + item.total), 0);

  return (
    <div className="w-full bg-white rounded-lg">
      <div className='h-[50px] px-4 flex items-center justify-between'>
        <h1 className='text-[12px] text-muted-foreground italic'>
          Print preview
        </h1>
        <div className='flex items-center gap-1'>
          {(!data?.approver && user?.userType === UserType.ADMIN) && (
            <Button
              size={'sm'}
              onClick={() => approveMutate(data?.id)}
              className='gap-1'
              disabled={approving}
            >
              {approving ? (
                <Loader2 size={16} className='animate-spin' />
              ) : (
                <ThumbsUp size={16} />
              )}
              <span>Approve</span>
            </Button>
          )}
          <Button
            onClick={() => reactToPrintFn()}
            size={'sm'}
            className='gap-1'
            disabled={data.approver ? false : true}
          >
            <Printer size={16} />
            <span>Print</span>
          </Button>
        </div>
      </div>
      <Separator />
      <div ref={contentRef} className="flex flex-col min-h-[100vh] p-4 space-y-4 justify-between">
        <div>
          <div className='flex justify-center items-center gap-x-4 flex-3'>
            <div className="text-center text-muted-foreground flex flex-col justify-center items-center">
              <img src={logo} className='object-contain w-[180px] h-[110px]' />
              <h3 className="text-xs font-semibold">Unit 601 The Meridian, Golam Drive Kasambagan, Cebu City 6000</h3>
              <div className="flex flex-col text-xs">
                <span>Email: accounting.cebu@horizonexpress.ph</span>
                <span>Contact Number: 09171871163</span>
              </div>
            </div>
          </div>

          <div className='p-2 text-muted-foreground space-y-4'>
            <div className='flex items-center gap-4'>
              <div className='w-full flex items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold'>
                  Supplier's name:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span>{data.supplier?.name}</span>
                </div>
              </div>

              <div className='w-[200px] flex items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold'>
                  Ser. No.:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span>{data.serialNumber}</span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex w-full items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold'>
                  Type:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span>
                    {typeLabelMap[data.type]}
                  </span>
                </div>
              </div>
              <div className='flex w-full items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold'>
                  Disbursement:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span>
                    {data.disbursementType}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex w-full items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold'>
                  Classification:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span>
                    {data.classification}
                  </span>
                </div>
              </div>
              <div className='flex w-full items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold'>
                  Classification type:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span>
                    {data.classificationType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1'>
          <div className='flex justify-center mb-2'>
            <h1 className='text-muted-foreground text-[18px] font-semibold'>
              Purchase Request
            </h1>
          </div>

          <table className="w-full table-auto border border-gray-300 text-[12px] text-muted-foreground">
            <thead>
              <tr>
                <th className="px-4 py-2 border-r border-gray-300 border-b">PARTICULARS</th>
                <th className="px-4 py-2 border-r border-gray-300 border-b">QTY.</th>
                <th className="px-4 py-2 border-r border-gray-300 border-b">UNIT PRICE</th>
                <th className="px-4 py-2 border-b border-gray-300">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {(data.purchaseOrderItems.length > 0) ? (
                <>
                  {data.purchaseOrderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-r border-gray-300 text-center">{item.particulars}</td>
                      <td className="px-4 py-2 border-r border-gray-300 text-center">{item.quantity.toLocaleString()}</td>
                      <td className="px-4 py-2 border-r border-gray-300 text-center">{formatCurrency('PHP', item.unitPrice)}</td>
                      <td className="px-4 py-2 text-center">{formatCurrency('PHP', item.total)}</td>
                    </tr>
                  ))}
                  <tr className='border'>
                    <td 
                      className="px-4 py-2 border-r border-gray-300 text-center col-span-2"
                      colSpan={3}
                    >
                      Grand Total
                    </td>
                    <td className="px-4 py-2 text-center">
                      {formatCurrency('PHP', grandTotal)}
                    </td>
                  </tr>
                </>
              ) : (
                <tr className='h-[200px]'>
                  <td className="px-4 py-2 border-r border-gray-300 text-center"></td>
                  <td className="px-4 py-2 border-r border-gray-300 text-center"></td>
                  <td className="px-4 py-2 border-r border-gray-300 text-center"></td>
                  <td className="px-4 py-2 text-center"></td>
                </tr>
              )}
            </tbody>
          </table>

          <div className='flex items-center gap-4 text-muted-foreground mt-2'>
            <div className='flex w-full items-end gap-1 text-[12px]'>
              <span className='leading-[16px] font-semibold'>
                Payment type:
              </span>
              <div className='flex-1 border-b leading-[16px]'>
                <span>
                  {paymentTypeLabelMap[data.paymentType]}
                </span>
              </div>
            </div>

            <div className='flex w-full items-end gap-1 text-[12px]'>
              <span className='leading-[16px] font-semibold'>
                Nos:
              </span>
              <div className='flex-1 border-b leading-[16px]'>
                <span>
                  {data.nos}
                </span>
              </div>
            </div>

            <div className='flex w-full items-end gap-1 text-[12px]'>
              <span className='leading-[16px] font-semibold'>
                Others:
              </span>
              <div className='flex-1 border-b leading-[16px]'>
                <span>
                  {data.other}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-end justify-evenly gap-4 text-muted-foreground pb-4'>
          <div className='w-full text-center max-w-[250px] text-[12px] text-muted-foreground'>
            <div className='flex-1 border-b leading-[16px]'>
              {data.creator && (
                <div className='flex flex-col items-center'>
                  {data.creator.signature && (
                    <img
                      className='relative -bottom-2 h-[45px] object-contain'
                      src={data.creator.signature}
                      alt="signature"
                    />
                  )}
                  <span className='text-[12px] font-semibold uppercase'>
                    {`${data?.creator?.firstName} ${data?.creator?.lastName}`}
                  </span>
                </div>
              )}
            </div>
            <span className='leading-[16px]'>
              Prepared by
            </span>
          </div>
          <div className='w-full text-center max-w-[250px] text-[12px] text-muted-foreground'>
            <div className='flex-1 border-b leading-[16px]'>
              {data.approver && (
                <div className='flex flex-col items-center'>
                  {data.approver.signature && (
                    <img
                      className='relative -bottom-2 h-[45px] object-contain'
                      src={data.approver.signature}
                      alt="signature"
                    />
                  )}
                  <span className='text-[12px] font-semibold uppercase'>
                    {`${data?.approver?.firstName} ${data?.approver?.lastName}`}
                  </span>
                </div>
              )}
            </div>
            <span className='leading-[16px]'>
              Approved & Reviewed by
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
