export type SidebarItemsType = {
  label: string;
  icon: string;
  link: string;
}

const AdminSidebarItems: Array<SidebarItemsType> = [
  { label: "Dashboard", icon: "Dashboard", link: "/admin" },
  { label: "Transactions", icon: "Transactions", link: "/admin/transactions" },
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

const Constants = {
  VersionNumber,
  AdminSidebarItems,
  ContainerVariants,
}

export default Constants
