import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";
import SideBar from "./section/sidebar";
import logo from "../assets/logo.png"
import Constants from "@/constants";

const Layout: React.FC = () => {
	const { session, loading } = useAuth();
	const currentPath = location.pathname;

	if (loading) return null;

	if (!session || !session.user) {
		return <Navigate to="/auth/sign-in" />;
	}

	const redirectRoute = Constants.UserRedirectRoute[session.user.userType];
  if (redirectRoute && currentPath !== redirectRoute && !currentPath.startsWith(redirectRoute)) {
    return <Navigate to={redirectRoute} />;
  }

	return (
		<div className="h-screen flex overflow-auto gap-x-2 bg-sidebar-gradient 100 p-2">
			<SideBar />
			<div className="w-full rounded-xl  z-50">
				<Outlet />
			</div>
			<img src={logo} className="absolute z-0 bottom-4 right-5 w-[120px] h-[120px] object-contain" />
		</div>
	);
};

export default Layout;
