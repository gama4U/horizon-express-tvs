import { Printer } from 'lucide-react'
import Constants from '../../../constants'
import { ISalesAgreement } from '../../../interfaces/sales-agreement.interface'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import { useRef } from 'react'
import {useReactToPrint} from 'react-to-print';

interface Props {
  data: ISalesAgreement
}

export default function PrintPreview({data}: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="w-full bg-white rounded-lg">
      <div className='h-[50px] px-4 flex items-center justify-between'>
        <h1 className='text-[12px] text-muted-foreground italic'>Print preview</h1>
        <Button onClick={() => reactToPrintFn()} size={'sm'} className='gap-1'>
          <Printer size={16}/>
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

        <div className='p-2 text-muted-foreground space-y-4'>
          <div className='flex items-center gap-4'>
            <div className='w-full flex items-end gap-1 text-[12px]'>
              <span className='leading-[16px] font-semibold'>
                Client name: 
              </span>
              <div className='flex-1 border-b leading-[16px]'>
                <span>{data.clientName}</span>
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
                Type of client: 
              </span>
              <div className='flex-1 border-b leading-[16px]'>
                <span>
                  {Constants.ClientTypesMap[data.typeOfClient]}
                </span>
              </div>
            </div>

            <div className='flex w-[200px] items-end gap-1 text-[12px]'>
              <span className='leading-[16px] font-semibold'>
                P.O. Number: 
              </span>
              <div className='flex-1 border-b leading-[16px]'>
                <span>
                  {data.purchaseOrder?.serialNumber ?? '' }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center mb-2'>
          <h1 className='text-muted-foreground text-[18px] font-semibold'>
            Sales Agreement
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
            {(data.salesAgreementItems.length > 0) ? (
              <>
                {data.salesAgreementItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-r border-gray-300 text-center">{item.particulars}</td>
                    <td className="px-4 py-2 border-r border-gray-300 text-center">{item.quantity.toLocaleString()}</td>
                    <td className="px-4 py-2 border-r border-gray-300 text-center">{item.unitPrice.toLocaleString()}</td>
                    <td className="px-4 py-2 text-center">{item.total.toLocaleString()}</td>
                  </tr>
                ))}
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
        <div className='flex items-end justify-evenly gap-4 text-muted-foreground mt-4'>
          <div className='w-full text-center max-w-[250px] text-[12px]'>
            <div className='flex-1 border-b leading-[16px]'>
              <span className='text-[12px] font-semibold'>
                {data.preparedBy }
              </span>
            </div>
            <span className='leading-[16px]'>
              Prepared by 
            </span>
          </div>

          <div className='w-full text-center max-w-[250px] text-[12px]'>
            <div className='flex-1 border-b leading-[16px]'>
              <span className='text-[12px] font-semibold'>
                {data.preparedBy}
              </span>
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
