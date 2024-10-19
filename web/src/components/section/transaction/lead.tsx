import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Pencil } from "lucide-react";
import { IClient } from "@/api/mutations/client.mutation";
import ClientTypeBadge from "@/components/badges/client-type";

interface ClientDetailsProps {
  clientData: IClient;
  forSelection?: boolean
}

export default function ClientDetails({ clientData, forSelection }: ClientDetailsProps) {

  return (
    <div className="flex flex-col gap-y-6 p-4 sm:p-6 lg:p-0 mt-2 bg-white rounded-lg">
      <div className="border-2 border-dotted p-4 mb-2">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm font-semibold">Client Information</p>
          {!forSelection &&
            <div className="flex flex-row gap-x-2 items-center ">
              <Button size="icon" variant="ghost" className="text-xs gap-x-2" onClick={() => { }}>
                <Pencil size={14} />
              </Button>
            </div>}
        </div>

        <Separator className="my-2" />

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="text-xs font-medium">First Name:</p>
            <p className="text-xs text-gray-700">{clientData.name}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="text-xs font-medium">Client Type</p>
            <ClientTypeBadge value={clientData.clientType} />
          </div>
          {clientData.department &&
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-xs font-medium">Department</p>
              <p className="text-xs text-gray-700">{clientData.department}</p>
            </div>
          }
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="text-xs font-medium">Office Branch:</p>
            <p className="text-xs text-gray-700">{clientData.officeBranch}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="text-xs font-medium">Contact Number:</p>
            <p className="text-xs text-gray-700">{clientData.contactNumber}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="text-xs font-medium">Email Address:</p>
            <p className="text-xs text-gray-700">{clientData.email}</p>
          </div>
        </div>

        {!forSelection &&
          <>
            <Separator className="my-6" />

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold">Documents</h2>
                <Button variant="outline" className="text-xs" onClick={() => { }}>
                  Add Documents
                </Button>
              </div>

              <div className="space-y-4 border-2 rounded-xl p-4">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xs text-primary font-semibold">Document # 1</p>
                </div>
                <div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}
