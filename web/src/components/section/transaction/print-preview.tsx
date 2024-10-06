import { Printer } from 'lucide-react'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { ITransaction } from '@/interfaces/transaction.interface'

interface Props {
  data: ITransaction
}

export default function PrintPreview({ data }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="w-full bg-white rounded-lg">
      <div className='h-[50px] px-4 flex items-center justify-between'>
        <h1 className='text-[12px] text-muted-foreground italic'>Print preview</h1>
        <Button onClick={() => reactToPrintFn()} size={'sm'} className='gap-1'>
          <Printer size={16} />
          <span>Print</span>
        </Button>
      </div>
      <Separator />
      <div ref={contentRef} className='p-4 min-h-[900px] space-y-4'>
        <div className='text-center text-muted-foreground'>
          <h1 className='text-[22px] font-semibold'>
            HORIZON EXPRESS TRAVEL AND TOURS INC.
          </h1>
          <h3 className='text-[12px] font-semibold'>
            Unit 601 The Meridian, Golam Drive Kasambagan, Cebu City 6000
          </h3>
          <div className='flex flex-col text-[12px]'>
            <span>Email: accounting.cebu@horizonexpress.ph</span>
            <span>Contact Number: 09171871163</span>
          </div>
        </div>

        <div className='flex-1 border-b-2 leading-[16px]' />

        <div className='p-2 text-muted-foreground space-y-4'>
          <div className='flex flex-col items-center gap-4'>
            <div className='w-full flex items gap-1 text-[12px]'>
              <span className='leading-[16px] font-semibold'>
                Lead name:
              </span>
              <div className='flex-1  leading-[16px]'>
                <span>{data.lead.firstName}{" "}{data.lead.lastName}</span>
              </div>
            </div>
            <div className='w-full flex items gap-1 text-[12px]'>
              <span className='leading-[16px] font-semibold'>
                Transaction Voucher #:
              </span>
              <div className='flex-1 leading-[16px]'>
                <span>{data.id}{" "}{data.lead.lastName}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
