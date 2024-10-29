import CreatePackageAccommodationDialog from '@/components/dialogs/package/create-accommodation'
import CreatePackageAirfareDialog from '@/components/dialogs/package/create-airfare'
import UpdatePackageAccommodationDialog from '@/components/dialogs/package/edit-accommodation'
import UpdatePackageAirfareDialog from '@/components/dialogs/package/edit-airfare'
import { Separator } from '@/components/ui/separator'
import { IPackage } from '@/interfaces/package.interface'
import { Currency } from '@/interfaces/sales-agreement-item.interface'
import { MinusCircle, PlusCircle } from 'lucide-react'

interface Props {
  data: IPackage
}

const currencyMap: Record<Currency, string> = {
  PHP: 'Philippine Peso (PHP)',
  USD: 'US Dollar (USD)'
}

export default function PackageInfo({data}: Props) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Package name
          </span>
          <h3 className="text-[12px]">
            {`${data.name}`}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Package no.
          </span>
          <h3 className="text-[12px]">
            {`${data.packageNumber}`}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Remarks
          </span>
          <h3 className="text-[12px]">
            {`${data.remarks}`}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Creator
          </span>
          <h3 className="text-[12px]">
            {`${data.creator?.firstName} ${data.creator?.lastName}`}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Approved by
          </span>
          <h3 className="text-[12px]">
            {`${data.approver?.firstName || ''} ${data.approver?.lastName || ''}`}
          </h3>
        </div>
      </div>
      <Separator className="bg-slate-200" />
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="space-y-1">
          <h1 className="text-[12px] font-semibold">
            Inclusions
          </h1>
          <div className="space-y-1 text-muted-foreground">
            {data.inclusions.map((item, index) => (
              <div key={index} className="text-[12px] flex items-center gap-2">
                <PlusCircle size={16}/>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-[12px] font-semibold">
            Exclusions
          </h1>
          <div className="space-y-1 text-muted-foreground">
            {data.exclusions.map((item, index) => (
              <div key={index} className="text-[12px] flex items-center gap-2">
                <MinusCircle size={16}/>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator className="bg-slate-200" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[12px] font-semibold">
            Accommodation
          </h1>
          {!data?.accommodation ? (
            <CreatePackageAccommodationDialog packageId={data.id ?? ''}/>
          ) : (
            <UpdatePackageAccommodationDialog packageAccommodation={data.accommodation}/>
          )}
        </div>
        
        {data?.accommodation && (
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px]">
                Category
              </span>
              <h3 className="text-[12px]">
                {`${data.accommodation.category}`}
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px]">
                Rate per person
              </span>
              <h3 className="text-[12px]">
                {`${data.accommodation.ratePerPerson}`}
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px]">
                Currency
              </span>
              <h3 className="text-[12px]">
                {`${currencyMap[data.accommodation.currency]}`}
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px]">
                Options
              </span>
              {data.accommodation.options.map((item, index) => (
                <h3 key={index} className="text-[12px]">
                  {`${index + 1}.) ${item}`}
                </h3>
              ))}
            </div>
          </div>
        )}
      </div>
      <Separator className="bg-slate-200" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[12px] font-semibold">
            Airfare
          </h1>
          {!data?.airfare ? (
            <CreatePackageAirfareDialog packageId={data.id ?? ''}/>
          ) : (
            <UpdatePackageAirfareDialog data={data.airfare}/>
          )}
        </div>
        {data.airfare && (
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px]">
                Airline
              </span>
              <h3 className="text-[12px]">
                {`${data.airfare.airline}`}
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px]">
                Flight details
              </span>
              <h3 className="text-[12px]">
                {`${data.airfare.flightDetails}`}
              </h3>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
