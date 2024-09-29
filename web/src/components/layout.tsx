import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";
import SideBar from "./section/sidebar";

const Layout: React.FC = () => {
  const { session, loading } = useAuth();

  if(loading) return null;

  if (!session || !session.user) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <div className="flex overflow-hidden gap-x-2 bg-green-100 p-2">
			<SideBar />
			<div className="w-full overflow-auto h-screen p-4 rounded-xl bg-white">
        <Outlet />
			</div>
		</div>
  );
};

export default Layout;
