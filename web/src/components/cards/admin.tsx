import React from 'react';
import { FilePlus2, LucideIcon, SquarePen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardTitle } from '../ui/card';
import CountUp from 'react-countup';
import { format } from 'date-fns';
import { RecentActivity } from '@/api/queries/transaction';
import { useNavigate } from 'react-router-dom';

interface DashboardCardProps {
	title: string;
	value: number;
	icon?: LucideIcon;
	shortLabel?: string;
	showRate?: boolean;
	rate?: number;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon, showRate, rate, shortLabel }) => {
	return (
		<Card className="bg-[#FFFFFF99] rounded-xl shadow-md p-4 flex flex-col justify-start items-start h-40 w-56">
			<CardTitle>
				<div className="flex items-center my-2">
					{Icon && <Icon className="text-2xl mr-2" />}
					<h2 className="text-normal font-normal">{title}</h2>
				</div>
			</CardTitle>
			<CardContent className="flex justify-between items-center flex-grow w-full flex-col">
				<CountUp end={value} className="text-4xl font-semibold" />

				{showRate && (
					<div className="mt-2 flex items-center gap-x-3 w-full">
						<TrendingUp size={16} color={"#59A86F"} />
						<div className="text-[#59A86F] text-md font-semibold">{rate}%</div>
						<p className="text-[10px] font-light">{shortLabel}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export const RecentActivityCard: React.FC<{ item: RecentActivity }> = ({ item }) => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		switch (item.type) {
			case 'Transaction':
				navigate(`/admin/transactions/${item.id}/`);
				break;
			case 'Sales Agreement':
				navigate(`/admin/sales-agreement/${item.id}/`);
				break;
			case 'Purchase Request':
				navigate(`/admin/purchase-request/${item.id}/`);
				break;
			case 'Memorandum':
				navigate(`/admin/memorandum/${item.id}/`);
				break;
			default:
				break;
		}
	};

	return (
		<div
			onClick={handleNavigate}
			key={item.id}
			className={`border p-2 text-[10px] rounded-md mb-2 flex flex-row items-center justify-between hover:bg-primary-foreground bg-[#FFFFFF99] cursor-pointer`}
		>
			<div className="w-2/3">
				<p className="text-xs font-medium">{item.type} {item.status}</p>
				{item.creator && <p>by: {item.creator?.firstName} {item.creator?.lastName}</p>}
				{item?.preparedBy?.firstName && <p>by: {item.preparedBy?.firstName} {item.preparedBy?.lastName}</p>}
				<span>{format(new Date(item.createdAt ?? new Date()), 'MMMM d, h:mm a')}</span>
			</div>
			{item.status === 'Created' && <FilePlus2 size={20} color='#045C2B' />}
			{item.status === 'Updated' && <SquarePen size={20} color='#E76E50' />}
		</div>
	);
};
