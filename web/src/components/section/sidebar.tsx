import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Button } from "../ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import AnimatedDiv from "../animated/Div";
import logo from "../../assets/logo.png"
import Constants, { SidebarItemsType } from "../../constants";
import { LogoutButton, SidebarIcons } from "./sidebar-items";
import { useAuth } from "../../providers/auth-provider";
import { useNavigate } from "react-router-dom";

const SideBar = React.memo(() => {
	SideBar.displayName = 'SideBar';

	const { logout } = useAuth();

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

	const checkRoute = (link: SidebarItemsType["link"]) => {
		return link === "/admin" ? pathname === link : pathname.startsWith(link);
	};

	useEffect(() => {
		containerControls.start(isOpen ? "open" : "close");
	}, [isOpen, containerControls]);

	const handleRedirect = (link: SidebarItemsType["link"]) => navigate(link);

	return (
		<motion.nav
			variants={Constants.ContainerVariants}
			animate={containerControls}
			initial="open"
			className={`bg-[#FFFFFF] z-50  p-3 h-full sticky top-0 left-0 rounded-xl  justify-between flex flex-col`}>
			<div>
				<div className={`flex flex-col ${isOpen ? "items-end" : "items-center"}`}>
					<Button variant="ghost" size="icon" onClick={handleOpenClose}>
						{isOpen ? (
							<PanelRightOpen size={24} />
						) : (
							<PanelRightClose size={24} />
						)}
					</Button>
				</div>
				<div className="justify-center flex mb-5">
					<img
						src={logo}
						alt="company-logo"
						className="w-[120px] h-[120px] object-contain"
					/>
				</div>

				<div className="flex flex-col mt-5">
					{Constants.AdminSidebarItems.map((item: SidebarItemsType, index: number) => {
						const isSelected = checkRoute(item.link);
						return (
							<AnimatedDiv className="" animationType="Bubble" delay={0} key={index}>
								<div
									onClick={() => handleRedirect(item.link)}
									className={`my-[2px] cursor-pointer items-center py-2 hover:bg-[#F79151]  rounded-xl ${isSelected ? "bg-primary" : ""} ${isOpen ? "px-5 flex flex-row" : "px-2"}`}
								>
									<SidebarIcons icon={item.icon} isSelected={isSelected} />
									{isOpen && (
										<span className={`line-clamp-1 text-sm w-full ${isSelected ? 'text-white' : 'text-black'}`}>
											{item.label}
										</span>
									)}
								</div>
							</AnimatedDiv>
						);
					})}
				</div>
			</div>

			<div className="rounded-md bg-white flex w-full px-2 py-1 justify-between items-center border">
				{isOpen && (
					<div>
						<div className="bg-clip-text text-[8px] font-bold text-secondary ">
							Transaction Voucher System
						</div>
						<p className="text-[#919191] text-[8px]">version {Constants.VersionNumber}</p>
					</div>
				)}
				<LogoutButton handleLogout={logout} />
			</div>
		</motion.nav>
	);
});

export default SideBar;
