import { Loader2, MinusCircle, PlusCircle, Printer, ThumbsUp } from 'lucide-react'
import Constants from '../../../constants'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { useAuth } from '@/providers/auth-provider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import logo from "../../../assets/logo.png"
import { RenderHeaderText } from '@/components/common/header'
import { IPackage } from '@/interfaces/package.interface'
import { format } from 'date-fns'
import { approvePackage } from '@/api/mutations/package.mutation'
import { formatCurrency } from '@/utils/currency.utils'

interface Props {
  data: IPackage
}

export default function PrintPreview({ data }: Props) {
  const queryClient = useQueryClient();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { session: { user } } = useAuth();
  const { PermissionsCanApprove } = Constants;

  const { mutate: approveMutate, isPending: approving } = useMutation({
    mutationFn: async (id: string) => await approvePackage(id),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ['package-details'] })
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

  return (
    <div className="w-full bg-white rounded-lg">
      <div className='h-[50px] px-4 flex items-center justify-between'>
        <h1 className='text-[12px] text-muted-foreground italic'>Print preview</h1>
        <div className='flex items-center gap-1'>
          {(!data?.approver && (user?.permission && PermissionsCanApprove.includes(user?.permission))) && (
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
      <div ref={contentRef} className="flex flex-col  p-4 space-y-4">
        <div>
          <div className='text-center text-black flex flex-col items-center'>
            <img src={logo} className='object-contain w-[220px] h-[150px] self-center' />
            {RenderHeaderText(data.officeBranch)}
          </div>

          <div className='p-2 text-muted-foreground space-y-4 mt-4'>
            <div className='flex items-center gap-4'>
              <div className='w-full flex items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold'>
                  Package name:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span>{data.name}</span>
                </div>
              </div>
              
              <div className='flex min-w-[300px] w-fit  items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold text-nowrap'>
                  Date created:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span className='text-nowrap'>
                    {format(new Date(data?.createdAt ?? new Date), 'MMMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex w-full items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold text-nowrap'>
                  Package No.:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span className='text-nowrap'>{data.packageNumber}</span>
                </div>
              </div>

              <div className='flex  min-w-[300px] w-fit items-end gap-1 text-[12px]'>
                <span className='leading-[16px] font-semibold text-nowrap'>
                  Remarks:
                </span>
                <div className='flex-1 border-b leading-[16px]'>
                  <span className='text-nowrap'>
                    {data.remarks}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator className="bg-slate-200" />
        <div className='flex-1 space-y-4'>
          <h3 className="uppercase text-sm tracking-[14px] text-center font-medium bg-slate-200 py-1">
            Inclusions
          </h3>
          <div className="space-y-1 px-4">
            {data.inclusions.map((item, index) => (
              <div key={index} className="text-[12px] flex items-center gap-2">
                <PlusCircle size={16}/>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <Separator className="bg-slate-200" />
        <div className='flex-1 space-y-4'>
          <h3 className="uppercase text-sm tracking-[14px] text-center font-medium bg-slate-200 py-1">
            Exclusions
          </h3>
          <div className="space-y-1 px-4">
            {data.exclusions.map((item, index) => (
              <div key={index} className="text-[12px] flex items-center gap-2">
                <MinusCircle size={16}/>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <Separator className="bg-slate-200" />
        <div className='flex-1 space-y-4'>
          <h3 className="uppercase text-sm tracking-[14px] text-center font-medium bg-slate-200 py-1">
            Accommodation
          </h3>
          <div className="space-y-1 px-4 text-[12px] flex">
            <div className='w-full'>
              <div className='flex items-center gap-2'>
                <h3>Hotel category: </h3>
                <span>{data.accommodation?.category}</span>
              </div>
              <div className='flex items-center gap-2'>
                <h3>Rate per person: </h3>
                <span>
                  {formatCurrency(data.accommodation?.currency ?? '', data.accommodation?.ratePerPerson ?? 0)}
                </span>
              </div>
            </div>
            <div className='w-full'>
              <div className='space-y-2'>
                <h3>Hotel options: </h3>
                <div className='ml-2'>
                  {data.accommodation?.options.map((item, index) => (
                    <div className='flex items-center gap-2'>
                      <span>{`${index + 1}`}</span>
                      <span key={index}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator className="bg-slate-200" />
        <div className='flex-1 space-y-4'>
          <h3 className="uppercase text-sm tracking-[14px] text-center font-medium bg-slate-200 py-1">
            Airfare
          </h3>
          <div className="space-y-1 px-4 text-[12px]">
            <div className='w-full'>
              <div className='flex items-center gap-2'>
                <h3>Airline: </h3>
                <span>{data.airfare?.airline}</span>
              </div>
              <div className='flex items-center gap-2'>
                <h3>Flight details: </h3>
                <span>{data.airfare?.airline}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-end justify-evenly gap-4 text-muted-foreground mt-4 flex-3 pb-4'>
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
