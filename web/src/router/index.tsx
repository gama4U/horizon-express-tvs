import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../pages/admin/dashboard";
import Landing from "../pages";
import SignIn from "../pages/auth/sign-in";

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
      }
    ]
  },
]);

export default router;