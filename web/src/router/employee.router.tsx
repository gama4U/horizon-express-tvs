import Layout from "@/components/layout";
import Leads from "@/pages/employee/leads";
import Memorandum from "@/pages/employee/memorandum";
import MemorandumDetails from "@/pages/employee/memorandum/details";
import Profile from "@/pages/employee/profile";
import PurchaseRequests from "@/pages/employee/purchase-request";
import PurchaseRequestDetails from "@/pages/employee/purchase-request/details";
import SalesAgreements from "@/pages/employee/sales-agreement";
import SalesAgreementDetails from "@/pages/employee/sales-agreement/details";
import Transactions from "@/pages/employee/transactions";
import ManageTransaction from "@/pages/employee/transactions/details";
import { RouteObject } from "react-router-dom";

const employeeRouter: RouteObject = {
  path: '/employee',
  element: <Layout />,
  children: [
    {
      path: '',
      element: <Transactions />
    },
    {
      path: 'transactions/:id/',
      element: <ManageTransaction />
    },
    {
      path: 'leads',
      element: <Leads />
    },
    {
      path: 'purchase-requests',
      element: <PurchaseRequests />
    },
    {
      path: 'purchase-requests/:id',
      element: <PurchaseRequestDetails />
    },
    {
      path: 'sales-agreements',
      element: <SalesAgreements />
    },
    {
      path: 'sales-agreements/:id',
      element: <SalesAgreementDetails />
    },
    {
      path: 'memorandum',
      element: <Memorandum />
    },
    {
      path: 'memorandum/:id',
      element: <MemorandumDetails />
    },
    {
      path: 'profile',
      element: <Profile />
    }
  ]
}

export default employeeRouter;
