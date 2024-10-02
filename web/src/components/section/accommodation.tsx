import { IAccommodation } from "../../interfaces/accommodation.interface";
import { Label } from "../ui/label";
import AddAccommodationForm from "../dialogs/add-accommodation";

interface Props {
  accommodation?: IAccommodation;
  transactionId: string;
}
export default function Accommodation({ accommodation, transactionId }: Props) {
  return (
    <div className="rounded-lg border">
      {accommodation ? (
        <div>Accommodation Details</div>
      ) : (
        <div>
          <div className="h-[200px] w-full flex items-center justify-center">
            <Label>No accommodation</Label>
          </div>
          <div className="flex justify-end">
            <AddAccommodationForm transactionId={transactionId} />
          </div>
        </div>
      )}
    </div>
  )
}
