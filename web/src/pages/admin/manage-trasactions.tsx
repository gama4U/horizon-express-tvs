import { useParams } from "react-router-dom";
import Accommodation from "../../components/section/accommodation";
import TopBar from "../../components/section/topbar";
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "../../components/ui/accordion";

export default function ManageTransaction() {
  const { id } = useParams()
  return (
    <div className="space-y-2">
      <TopBar
        showBackButton={true}
        LeftSideHeader={
          <p className="text-sm">
            Transaction Voucher <span className="font-medium">#{id}</span>
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Add/Manage this transaction voucher</p>
        }
      />
      <div className="flex justify-between h-screen flex-row gap-x-2">
        <div className="flex flex-col w-[50%] bg-white p-4">
          <Accordion type="multiple" className="w-full" >
            <AccordionItem value="item-1">
              <AccordionTrigger>Horizon Express Users Only</AccordionTrigger>
              <AccordionContent>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Travel Itinerary</AccordionTrigger>
              <AccordionContent>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Accommodation</AccordionTrigger>
              <AccordionContent>
                <Accommodation
                  transactionId={String(id)}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Travel</AccordionTrigger>
              <AccordionContent>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Tours</AccordionTrigger>
              <AccordionContent>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
        <div className="flex flex-col w-[50%] bg-white ">
          <p>sd</p>
        </div>

      </div>
    </div>
  )
}
