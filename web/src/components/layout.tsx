import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";
import SideBar from "./section/sidebar";
import TopBar from "./section/topbar";

const Layout: React.FC = () => {
	const { session, loading } = useAuth();

	if (loading) return null;

	if (!session || !session.user) {
		return <Navigate to="/auth/sign-in" />;
	}

	return (
		<div className="flex overflow-hidden gap-x-2 bg-green-100 p-2">
			<SideBar />
			<div className="w-full h-screen space-y-2">
				<TopBar />
				<div className="w-full overflow-auto h-full p-4 rounded-xl bg-[#FFFFFF99] z-50">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
