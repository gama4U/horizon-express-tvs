import { TypeOfClient } from "./interfaces/sales-agreement.interface";

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
  { label: "Memorandum", icon: "Memorandum", link: "/admin/memorandum" },
  { label: "Users", icon: "Users", link: "/admin/users" },
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
