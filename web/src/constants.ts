import { TypeOfClient } from "./interfaces/sales-agreement.interface";
import { PermissionType, UserType } from "./interfaces/user.interface";

export type SidebarItemsType = {
  label: string;
  icon: string;
  link: string;
}

const AdminSidebarItems: Array<SidebarItemsType> = [
  { label: "Dashboard", icon: "Dashboard", link: "/admin" },
  { label: "Transactions", icon: "Transactions", link: "/admin/transactions" },
  { label: "Sales Agreements", icon: "Purchase", link: "/admin/sales-agreements" },
  { label: "Purchase Requests", icon: "Sales", link: "/admin/purchase-requests" },
  { label: "Leads", icon: "Leads", link: "/admin/leads" },
  { label: "Memorandums", icon: "Memorandum", link: "/admin/memorandum" },
  { label: "Users", icon: "Users", link: "/admin/users" },
  { label: "Profile", icon: "Profile", link: "/admin/profile" },
]

const EmployeeSidebarItems: Array<SidebarItemsType> = [
  { label: "Transactions", icon: "Transactions", link: "/employee" },
  { label: "Sales Agreements", icon: "Purchase", link: "/employee/sales-agreements" },
  { label: "Purchase Requests", icon: "Sales", link: "/employee/purchase-requests" },
  { label: "Leads", icon: "Leads", link: "/employee/leads" },
  { label: "Memorandum", icon: "Memorandum", link: "/employee/memorandum" },
  { label: "Profile", icon: "Profile", link: "/employee/profile" },
]

const ContainerVariants = {
  close: {
    width: "4rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
}

const VersionNumber: String = '0.1.0'
const NoTopbarPaths = [
  "/admin/transactions"
]

const ClientTypesMap: Record<TypeOfClient, string> = {
  WALK_IN: 'Walk in',
  CORPORATE: 'Corporate',
  GOVERNMENT: 'Government',
}

const UserRedirectRoute: Record<UserType, string> = {
	ADMIN: '/admin',
	EMPLOYEE: '/employee'
}

const PermissionsCanDelete = [PermissionType.SUPER_ADMIN];
const PermissionsCanEdit = [PermissionType.SUPER_ADMIN, PermissionType.ACCOUNTING];
const PermissionsCanApprove = [PermissionType.SUPER_ADMIN, PermissionType.ACCOUNTING, PermissionType.SUPERVISOR];

const Constants = {
  VersionNumber,
  AdminSidebarItems,
  EmployeeSidebarItems,
  ContainerVariants,
  NoTopbarPaths,
  ClientTypesMap,
  UserRedirectRoute,
  PermissionsCanDelete,
  PermissionsCanEdit,
  PermissionsCanApprove
}

export default Constants
