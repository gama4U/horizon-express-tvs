import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";

const Layout: React.FC = () => {
  const { session, loading } = useAuth();

  if(loading) return null;

  if (!session || !session.user) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <div className="h-screen flex">
      {/* <Sidebar items={sideBarItemsMap[session.user.role] || []}/> */}
      <Outlet />
    </div>
  );
};

export default Layout;
