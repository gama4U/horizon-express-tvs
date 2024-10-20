import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Button } from "../ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import AnimatedDiv from "../animated/Div";
import Constants, { SidebarItemsType } from "../../constants";
import { LogoutButton, SidebarIcons } from "./sidebar-items";
import { useAuth } from "../../providers/auth-provider";
import { useNavigate } from "react-router-dom";
import { PermissionType, UserType } from "@/interfaces/user.interface";
import placeholder from "../../assets/placeholder.png"
import logo from "../../assets/logo.png"
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/api/queries/user.query";

const sidebarItemsMap: Record<UserType, SidebarItemsType[]> = {
	ADMIN: Constants.AdminSidebarItems,
	EMPLOYEE: Constants.EmployeeSidebarItems
}

const PermissionsRecord: Record<PermissionType, string> = {
	SUPER_ADMIN: 'Super Admin',
	SUPERVISOR: 'Supervisor',
	RESERVATION: 'Reservation',
	ACCOUNTING: 'Accounting',
}

const SideBar = React.memo(() => {
	SideBar.displayName = 'SideBar';
	const { session: { user }, logout } = useAuth();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const containerControls = useAnimationControls();
	const handleOpenClose = () => setIsOpen(!isOpen);

	const pathname = location.pathname;

	useEffect(() => {
		const handleResize = () => setIsOpen(window.innerWidth > 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		containerControls.start(isOpen ? "open" : "close");
	}, [isOpen, containerControls]);

	const checkRoute = (link: SidebarItemsType["link"]) => {
		const parentRoutes = ['/admin', '/employee'];
		return parentRoutes.includes(link) ? pathname === link : pathname.startsWith(link);
	};

	const { data: profile } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => await fetchProfile(),
	});

	const handleRedirect = (link: SidebarItemsType["link"]) => navigate(link);

	return (
		<motion.nav
			variants={Constants.ContainerVariants}
			animate={containerControls}
			initial="open"
			className={`bg-[#FFFFFF] overflow-y-auto z-50  p-3 h-full sticky top-0 left-0 rounded-xl  justify-between flex flex-col`}
			style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
		>
			<div>
				<div className={`flex flex-row items-center justify-between ${isOpen ? "items-end" : "items-center"}`}>
					{isOpen &&
						<img src={logo} className="object-contain w-[40px] h-[40px]" />
					}
					<Button variant="ghost" size="icon" onClick={handleOpenClose}>
						{isOpen ? (
							<PanelRightOpen size={20} />
						) : (
							<PanelRightClose size={20} />
						)}
					</Button>
				</div>
				<div className="justify-start flex flex-row items-center gap-x-2">
					<img
						src={profile?.avatar ?? placeholder}
						alt="user-avatar"
						className={`w-[60px] h-[60px] object-contain ${isOpen ? 'border-[#F98948] border-[2px] rounded-full' : 'border-none'}`}
					/>
					{isOpen && <div className="text-[10px]">
						<p className="text-primary font-semibold mb-[0.5px] text-[12px]">{profile?.firstName} {profile?.lastName}</p>
						{profile?.permission &&
							<p className="text-muted-foreground">{PermissionsRecord[profile?.permission]}, {profile.officeBranch}</p>
						}
					</div>
					}
				</div>

				<div className="flex flex-col mt-2">
					{user && sidebarItemsMap[user.userType].map((item: SidebarItemsType, index: number) => {
						const isSelected = checkRoute(item.link);
						return (
							<AnimatedDiv className="" animationType="Bubble" delay={0} key={index}>
								<div
									onClick={() => handleRedirect(item.link)}
									className={`my-[2px] cursor-pointer items-center py-2 hover:bg-[#F79151]  rounded-xl ${isSelected ? "bg-primary" : ""} ${isOpen ? "px-2 flex flex-row" : "px-2"}`}
								>
									<SidebarIcons icon={item.icon} isSelected={isSelected} />
									{isOpen && (
										<span className={`line-clamp-1 text-xs w-full ${isSelected ? 'text-white' : 'text-black'}`}>
											{item.label}
										</span>
									)}
								</div>
							</AnimatedDiv>
						);
					})}
				</div>
			</div >

			<div className="rounded-md bg-white flex w-full px-2 py-1 justify-between items-center border">
				{isOpen && (
					<div>
						<div className="bg-clip-text text-[8px] font-bold text-secondary ">
							Horizon Express Travel & Tours
						</div>
						<p className="text-[#919191] text-[8px]">version {Constants.VersionNumber}</p>
					</div>
				)}
				<LogoutButton handleLogout={logout} />
			</div>
		</motion.nav >
	);
});

export default SideBar;
