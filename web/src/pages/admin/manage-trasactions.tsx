import { useParams } from "react-router-dom";
import Accommodation from "../../components/section/accommodation";
import logo from '../../assets/logo.png';
import TopBar from "../../components/section/topbar";
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "../../components/ui/accordion";
import HorizonOnlyForms from "../../components/section/transactions/horizon-only";
import { useRecoilValue } from "recoil";
import { transactionAtom } from "../../utils/atoms";
import { Separator } from "../../components/ui/separator";

export default function ManageTransaction() {
  const { id } = useParams()
  const transactionData = useRecoilValue(transactionAtom)

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
                <HorizonOnlyForms />
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
        <div className="flex flex-col w-[50%] bg-white p-5 items-center">
          <p className="italic text-xs text-stone-400 self-start">Print Preview</p>
          <img src={logo} width={200} height={200} />
          <div className="flex items-start flex-col justify-start w-full mt-4">
            <p className="text-xs text-stone-800">Transaction Voucher #: <span className="font-semibold">{transactionData.transactionNumber}</span></p>
            <p className="text-xs text-stone-800">Lead: <span className="font-semibold">{transactionData.leadFirstName}{" "}{transactionData.leadLastName}</span></p>
          </div>
          <Separator className="my-2" />
        </div>

      </div>
    </div>
  )
}
