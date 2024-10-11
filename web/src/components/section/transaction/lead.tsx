import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Pencil } from "lucide-react";
import { ILead } from "@/api/mutations/lead.mutation";

interface LeadDetailsProps {
  leadData: ILead;
  forSelection?: boolean
}

export default function LeadDetails({ leadData, forSelection }: LeadDetailsProps) {

  return (
    <div className="flex flex-col gap-y-6 p-4 sm:p-6 lg:p-0 mt-2 bg-white rounded-lg">
      <div className="border-2 border-dotted p-4 mb-2">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm font-semibold">Lead Information</p>
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
            <p className="text-xs text-gray-700">{leadData.firstName}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="text-xs font-medium">Middle Name:</p>
            <p className="text-xs text-gray-700">{leadData.middleName}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="text-xs font-medium">Last Name:</p>
            <p className="text-xs text-gray-700">{leadData.lastName}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="text-xs font-medium">Contact Number:</p>
            <p className="text-xs text-gray-700">{leadData.contactNumber}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="text-xs font-medium">Email Address:</p>
            <p className="text-xs text-gray-700">{leadData.email}</p>
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

              {leadData.documents?.map((documents, idx) => (
                <div key={idx} className="space-y-4 border-2 rounded-xl p-4">
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-xs text-primary font-semibold">Document # 1</p>
                  </div>
                  <div>
                  </div>
                </div>
              ))}
            </div>
          </>
        }
      </div>
    </div>
  );
}
