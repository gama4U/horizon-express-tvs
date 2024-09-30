import { IAccommodation } from "../../interfaces/accommodation.interface";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator"
import AddAccommodationForm from "../dialogs/add-accommodation";

interface Props {
  accommodation?: IAccommodation;
  transactionId: string;
}
export default function Accommodation({accommodation, transactionId}: Props) {
  return (
    <div className="border rounded-lg space-y-1">
      <div className="p-4">
        <h1 className="text-[16px] font-semibold text-primary">
          Accommodation
        </h1>
      </div>
      <Separator />
      <div className="p-4">
        {accommodation ? (
          <div>Accommodation Details</div>
        ) : (
          <div>
            <div className="h-[200px] w-full flex items-center justify-center">
              <Label>No accommodation</Label>
            </div>
            <div className="flex justify-end">
              <AddAccommodationForm transactionId={transactionId}/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
