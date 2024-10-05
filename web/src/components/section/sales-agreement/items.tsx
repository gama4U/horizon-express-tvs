import { ISalesAgreementItem } from '../../../interfaces/sales-agreement.interface'
import { Columns } from '../../tables/sales-agreement-items/clumns'
import { DataTable } from '../../tables/sales-agreement-items/data-table'
import { Button } from '../../ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '../../ui/separator'

interface Props {
  data: ISalesAgreementItem[]
}

export default function SalesAgreementItems({data}: Props) {

  return (
    <div className="border border-slate-200 rounded-lg mt-4">
      <div className="flex items-center justify-between py-1 px-2">
        <h1 className='text-[12px] font-semibold'>
          Items
        </h1>
        <Button size={'icon'} variant={'ghost'} className="text-primary">
          <Plus size={18}/>
        </Button>
      </div>
      <Separator />
      <DataTable 
        columns={Columns}
        data={data}
        loading={false}
      />
    </div>
  )
}
