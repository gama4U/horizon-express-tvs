import { useParams } from "react-router-dom"
import TopBar from "../../../components/section/topbar";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/animated/Loader";
import { fetchPackage } from "@/api/queries/package.query";
import { useAuth } from "@/providers/auth-provider";
import { Separator } from "@/components/ui/separator";
import Constants from "@/constants";
import { MinusCircle, PlusCircle } from "lucide-react";
import EditPackageDialog from "@/components/dialogs/package/edit";
import CreatePackageAccommodationDialog from "@/components/dialogs/package/create-accommodation";
import { Currency } from "@/interfaces/sales-agreement-item.interface";
import UpdatePackageAccommodationDialog from "@/components/dialogs/package/edit-accommodation";

const currencyMap: Record<Currency, string> = {
  PHP: 'Philippine Peso (PHP)',
  USD: 'US Dollar (USD)'
}

export default function PackageDetails() {
  const { id } = useParams();
  const {session: {user}} = useAuth();
  const {PermissionsCanEdit} = Constants;

  const { data, isLoading } = useQuery({
    queryKey: ['package-details', id],
    queryFn: async () => {
      if (!id) return;
      return await fetchPackage(id)
    },
  });

  return (
    <div className="space-y-2">
      <TopBar
        showBackButton={true}
        LeftSideHeader={
          <p className="text-sm">
            Package details
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">
            Manage package details here
          </p>
        }
      />
      <div className="w-full flex gap-x-2 rounded-lg">
        <Loader isLoading={isLoading} />
        {data ? (
          <>
            <section className="w-full">
              <div className="h-[50px] flex px-4 justify-between items-center">
                <h1 className="text-[12px] font-semibold">
                  Details
                </h1>
                {(user?.permission && PermissionsCanEdit.includes(user?.permission)) && (
                  <EditPackageDialog data={data} />
                )}
              </div>
              <Separator className="bg-slate-200" />
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
                  {!data?.accomodation ? (
                    <CreatePackageAccommodationDialog packageId={id ?? ''}/>
                  ) : (
                    <UpdatePackageAccommodationDialog packageAccommodation={data.accomodation}/>
                  )}
                </div>
                
                {data?.accomodation && (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-[10px]">
                        Category
                      </span>
                      <h3 className="text-[12px]">
                        {`${data.accomodation.category}`}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-[10px]">
                        Rate per person
                      </span>
                      <h3 className="text-[12px]">
                        {`${data.accomodation.ratePerPerson}`}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-[10px]">
                        Currency
                      </span>
                      <h3 className="text-[12px]">
                        {`${currencyMap[data.accomodation.currency]}`}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-[10px]">
                        Options
                      </span>
                      {data.accomodation.options.map((item, index) => (
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
                <h1 className="text-[12px] font-semibold">
                  Airfare
                </h1>
              </div>
            </section>

            <section className="w-full">

            </section>
          </>
        ) : (
          <div className="h-[90vh] bg-white w-full rounded-lg" />
        )}
      </div>
    </div>
  )
}
