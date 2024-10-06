import { Columns } from '../../tables/sales-agreement-items/clumns'
import { DataTable } from '../../tables/sales-agreement-items/data-table'
import { Separator } from '../../ui/separator'
import AddSalesAgreementItemDialog from '../../dialogs/sales-agreement/add-item'
import { ISalesAgreementItem } from '../../../interfaces/sales-agreement-item.interface'

interface Props {
  data: ISalesAgreementItem[],
  salesAgreementId: string;
}

export default function SalesAgreementItems({data, salesAgreementId}: Props) {

  return (
    <div className='p-4'>
      <div className="border border-slate-200 rounded-lg">
        <div className="flex items-center justify-between py-1 px-2">
          <h1 className='text-[12px] font-semibold'>
            Items
          </h1>
          <AddSalesAgreementItemDialog 
            salesAgreementId={salesAgreementId}
          />
        </div>
        <Separator />
        <DataTable 
          columns={Columns}
          data={data}
          loading={false}
        />
      </div>
    </div>
  )
}
