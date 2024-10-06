import { TypeOfClient } from "./interfaces/sales-agreement.interface";

export type SidebarItemsType = {
  label: string;
  icon: string;
  link: string;
}

const AdminSidebarItems: Array<SidebarItemsType> = [
  { label: "Dashboard", icon: "Dashboard", link: "/admin" },
  { label: "Transactions", icon: "Transactions", link: "/admin/transactions" },
  { label: "Users", icon: "Users", link: "/admin/users" },
  { label: "Memorandum", icon: "Memorandum", link: "/admin/memorandum" },
  { label: "Sales Agreements", icon: "Purchase", link: "/admin/sales-agreements" },
  { label: "Purchase Requests", icon: "Sales", link: "/admin/purchase-requests" },
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

const Constants = {
  VersionNumber,
  AdminSidebarItems,
  ContainerVariants,
  NoTopbarPaths,
  ClientTypesMap
}

export default Constants
