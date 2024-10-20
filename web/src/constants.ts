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
	{ label: "Clients", icon: "Leads", link: "/admin/clients" },
	{ label: "Suppliers", icon: "Suppliers", link: "/admin/suppliers" },
	{ label: "Memorandums", icon: "Memorandum", link: "/admin/memorandum" },
	{ label: "Document Transactions", icon: "Documents", link: "/admin/document-transactions" },
	{ label: "Users", icon: "Users", link: "/admin/users" },
	{ label: "Profile", icon: "Profile", link: "/admin/profile" },
]

const EmployeeSidebarItems: Array<SidebarItemsType> = [
	{ label: "Transactions", icon: "Transactions", link: "/employee" },
	{ label: "Sales Agreements", icon: "Purchase", link: "/employee/sales-agreements" },
	{ label: "Purchase Requests", icon: "Sales", link: "/employee/purchase-requests" },
	{ label: "Clients", icon: "Leads", link: "/employee/clients" },
	{ label: "Suppliers", icon: "Suppliers", link: "/employee/suppliers" },
	{ label: "Memorandum", icon: "Memorandum", link: "/employee/memorandum" },
	{ label: "Document Transactions", icon: "Documents", link: "/employee/document-transactions" },
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

const VersionNumber: string = '0.1.0'
const NoTopbarPaths = [
	"/admin/transactions"
]

const ClientTypesMap: Record<TypeOfClient, string> = {
	WALK_IN: 'Walk in',
	CORPORATE: 'Corporate',
	GOVERNMENT: 'Government',
	GROUP: 'Group',
	INDIVIDUAL: 'Individual',
}

const UserRedirectRoute: Record<UserType, string> = {
	ADMIN: '/admin',
	EMPLOYEE: '/employee'
}

const PermissionsCanDelete = [PermissionType.SUPER_ADMIN];
const PermissionsCanEdit = [PermissionType.SUPER_ADMIN, PermissionType.ACCOUNTING];
const PermissionsCanApprove = [PermissionType.SUPER_ADMIN, PermissionType.ACCOUNTING, PermissionType.SUPERVISOR];

const GovernmentDepartments = ['Security', 'Education'];
const CorporateDepartments = ['Information Technology', 'Tourism', 'Accounting', 'Human Resource'];

const CommonDocuments = [
	{ value: "Passport", label: "Passport" },
	{ value: "NBI Clearance", label: "NBI Clearance" },
	{ value: "Birth Certificate", label: "Birth Certificate" },
	{ value: "Marriage Certificate", label: "Marriage Certificate" },
	{ value: "Business Permit", label: "Business Permit" },
	{ value: "Tax Identification Number (TIN)", label: "Tax Identification Number (TIN)" },
	{ value: "Philhealth Card", label: "PhilHealth Card" },
	{ value: "SSS Card", label: "SSS Card" },
	{ value: "Driver's License", label: "Driver's License" },
	{ value: "Voter ID", label: "Voter ID" },
	{ value: "Barangay Clearance", label: "Barangay Clearance" },
	{ value: "Community Tax Certificate (Cedula)", label: "Community Tax Certificate (Cedula)" },
	{ value: "Postal ID", label: "Postal ID" },
	{ value: "Student ID", label: "Student ID" },
	{ value: "Senior Citizen ID", label: "Senior Citizen ID" },
];

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
	PermissionsCanApprove,
	GovernmentDepartments,
	CorporateDepartments,
	CommonDocuments
}

export default Constants
