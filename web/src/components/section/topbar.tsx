import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimatedDiv from "../animated/Div";

interface TopBarProps {
	LeftSideComponent?: React.ReactNode;
	RightSideComponent?: React.ReactNode;
}

const TopBar = ({ RightSideComponent }: TopBarProps) => {
	const location = useLocation();
	const [key, setKey] = useState(0);

	const getTopBarTitle = (pathname: string) => {
		switch (pathname) {
			case "/admin":
				return "Dashboard";
			case "/admin/transactions":
				return "Transactions";
			case "/admin/users":
				return "Users";
			case "/admin/memorandum":
				return "Memorandum";
			case "/admin/sales-agreement":
				return "Sales Agreement";
			case "/admin/purchase-request":
				return "Purchase Request";
			default:
				return "";
		}
	};
	const getTopbarSubtitle = (pathname: string) => {
		switch (pathname) {
			case "/admin":
				return "Manage your reports here";
			case "/admin/transactions":
				return "View and Create Transaction Vouchers here";
			case "/admin/users":
				return "Manage your system users here";
			case "/admin/memorandum":
				return "Manage memorandum records here";
			case "/admin/sales-agreement":
				return "Manage sales agreement records here";
			case "/admin/purchase-request":
				return "Manage purchase requests records here";
			default:
				return "";
		}
	};


	useEffect(() => {
		setKey((prevKey) => prevKey + 1);
	}, [location.pathname]);

	return (
		<AnimatedDiv key={key} className="z-0" delay={0} animationType="SlideInFromLeft" duration={0.1} >
			<div className="bg-[#FFFFFF] px-4 rounded-xl w-full items-center h-[59px] flex flex-row justify-between sticky top-0 z-10">
				<div className="flex flex-col">
					<p className="flex-1 font-normal text-sm">
						{getTopBarTitle(location.pathname)}
					</p>
					<p className="flex-1 font-normal text-xs text-green-800">
						{getTopbarSubtitle(location.pathname)}
					</p>
				</div>
				<div className="flex-1">{RightSideComponent}</div>
			</div>
		</AnimatedDiv>
	);
};

export default TopBar;
