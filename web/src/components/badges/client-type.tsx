import Constants from "../../constants";
import { TypeOfClient } from "../../interfaces/sales-agreement.interface";
import { Badge } from "../ui/badge";

interface Props {
  value: TypeOfClient;
}

const badgeStyleMap: Record<TypeOfClient, string> = {
  WALK_IN: 'bg-green-100 hover:bg-green-200',
  CORPORATE: 'bg-blue-100 hover:bg-blue-200',
  GOVERNMENT: 'bg-orange-100 hover:bg-orange-200',
} 

export default function ClientTypeBadge({value}: Props) {
  return (
    <Badge
      className={`text-slate-700 ${badgeStyleMap[value]} cursor-default`}
    >
      {Constants.ClientTypesMap[value]}
    </Badge>
  )
}
