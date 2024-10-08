import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardTitle } from '../ui/card';
import CountUp from 'react-countup';

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
		<Card className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-start items-start h-40 w-56">
			<CardTitle>
				<div className="flex items-center my-2">
					{Icon && <Icon className="text-2xl mr-2" />}
					<h2 className="text-normal font-normal">{title}</h2>
				</div>
			</CardTitle>
			<CardContent className='flex justify-between items-center flex-grow w-full flex-col'>
				<CountUp end={value} className="text-4xl font-semibold" />

				{showRate && (
					<div className="mt-2 flex items-center gap-x-3 w-full">
						<TrendingUp size={16} color={"#59A86F"} />
						<div className="text-[#59A86F] text-md font-semibold">{rate}%</div>
						<p className='text-[10px] font-light'>{shortLabel}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
