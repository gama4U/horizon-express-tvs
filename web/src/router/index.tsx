import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../pages/admin/dashboard";
import Landing from "../pages";
import SignIn from "../pages/auth/sign-in";
import Transactions from "../pages/admin/transactions";
import TransactionDetails from "../pages/admin/transaction-details";
import ManageTransaction from "../pages/admin/manage-trasactions";
import Users from "../pages/admin/users";

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
    ]
  },
]);

export default router;