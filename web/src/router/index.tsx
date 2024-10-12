import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../pages/admin/dashboard";
import Landing from "../pages";
import SignIn from "../pages/auth/sign-in";
import ManageTransaction from "../pages/admin/transactions/details";
import Users from "../pages/admin/users";
import SalesAgreements from "../pages/admin/sales-agreement";
import SalesAgreementDetails from "../pages/admin/sales-agreement/details";
import Transactions from "../pages/admin/transactions";
import PurchaseRequests from "@/pages/admin/purchase-request";
import PurchaseRequestDetails from "@/pages/admin/purchase-request/details";
import Leads from "@/pages/admin/leads";
import Profile from "@/pages/admin/profile";
import Memorandum from "@/pages/admin/memorandum/memorandum";
import MemorandumDetails from "@/pages/admin/memorandum/details";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/auth/sign-in',
    element: <SignIn />
  },
  {
    path: '/admin',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'transactions/:id/',
        element: <ManageTransaction />
      },
      {
        path: 'users',
        element: <Users />
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
        path: 'memorandum',
        element: <Memorandum />
      },
      {
        path: 'memorandum/:id',
        element: <MemorandumDetails />
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
        path: 'profile',
        element: <Profile />
      }
    ]
  },
]);

export default router;
