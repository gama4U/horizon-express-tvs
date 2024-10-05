import { ISalesAgreement } from '../../../interfaces/sales-agreement.interface'

interface Props {
  data: ISalesAgreement
}

export default function PrintPreview({data}: Props) {
  return (
    <div className="w-full bg-white rounded-lg p-2">
      Print preview
    </div>
  )
}
