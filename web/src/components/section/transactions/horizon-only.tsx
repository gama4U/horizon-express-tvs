import { useQuery } from "@tanstack/react-query";
import { IHorizonOnlyFields } from "../../../interfaces/transaction.interface";
import CommonInput from "../../common/input";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "../../ui/select";
import { getAllUsers } from "../../../api/queries/user.query";
import { Input } from "../../ui/input";
import { useRecoilState } from "recoil";
import { transactionAtom } from "../../../utils/atoms";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  horizonFields?: IHorizonOnlyFields;
  transactionId?: string;
}
export default function HorizonOnlyForms({ horizonFields, transactionId }: Props) {

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().trim().min(1, {
      message: "Password is required."
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [transactionData, setTransactionData] = useRecoilState(transactionAtom)

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return await getAllUsers();
    },
  });

  const onChangeLeadName = (firstName: string, lastName: string) => {
    setTransactionData({
      ...transactionData,
      leadFirstName: firstName,
      leadLastName: lastName
    });
  };


  return (
    <div className="rounded-lg border p-4  w-full flex flex-col space-y-2">
      <div className="flex flex-row gap-x-2 items-center">
        <p>Select creator:</p>
        <Select onValueChange={(value) => {
          const selectedEmployee = employees?.find(employee => employee.id === value);
          if (selectedEmployee) {
            onChangeLeadName(selectedEmployee.firstName, selectedEmployee.lastName);
          }
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select creator" />
          </SelectTrigger>
          <SelectContent>
            {employees?.map((employee, index) => (
              <SelectItem value={employee.id} key={index}>{employee.firstName}{" "}{employee.lastName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <div className="flex flex-row items-center gap-x-2">
          <p className="text-xs">Sales Agreement Number:</p>
          <CommonInput placeholder="Statement Invoice #" onChange={(e) => setTransactionData({
            ...transactionData,
            salesAgreementNumber: e.target.value
          })} />
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <p className="text-xs">Purchase Involve Number:</p>
          <CommonInput placeholder="Suppliers Involve Purchase Order #" onChange={(e) => setTransactionData({
            ...transactionData,
            suppliersInvolveNumber: e.target.value
          })} />
        </div>
        <p className="text-xs">Attach Sales Agreement Document</p>
        <Input id="sales-agreement" type="file" />
        <p className="text-xs">Attach Purchase Order</p>
        <Input id="purchase-order" type="file" />
      </div>
    </div>
  )
}
