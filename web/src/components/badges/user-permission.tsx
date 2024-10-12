import { PermissionType } from "@/interfaces/user.interface";
import { Badge } from "../ui/badge";

interface Props {
  value: PermissionType;
}

const badgeStyleMap: Record<PermissionType, string> = {
  SUPER_ADMIN: 'bg-green-100 hover:bg-green-200',
  SUPERVISOR: 'bg-slate-100 hover:bg-slate-200',
} 

const badgeLabelMap: Record<PermissionType, string> = {
  SUPER_ADMIN: 'Super Admin',
  SUPERVISOR: 'Supervisor',
} 

export default function UserPermissionBadge({value}: Props) {
  return (
    <Badge
      className={`text-slate-700 ${badgeStyleMap[value]} cursor-default text-[10px] w-fit min-w-[125px] justify-center`}
    >
      {badgeLabelMap[value]}
    </Badge>
  )
}
