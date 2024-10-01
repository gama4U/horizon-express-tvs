import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../pages/admin/dashboard";
import Landing from "../pages";
import SignIn from "../pages/auth/sign-in";
import Transactions from "../pages/admin/transactions";
import TransactionDetails from "../pages/admin/transaction-details";
import ManageTransaction from "../pages/admin/manage-trasactions";
import Users from "../pages/admin/users";
import Memorandum from "../pages/admin/memorandum";
import PurchaseRequest from "../pages/admin/purchase-request";
import SalesAgreement from "../pages/admin/sales-agreement";

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
        path: 'transactions/:id',
        element: <TransactionDetails />
      },
      {
        path: 'transactions/:id/manage',
        element: <ManageTransaction />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'purchase-request',
        element: <PurchaseRequest />
      },
      {
        path: 'memorandum',
        element: <Memorandum />
      },
      {
        path: 'sales-agreement',
        element: <SalesAgreement />
      },
    ]
  },
]);

export default router;
