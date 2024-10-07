import { VoucherTypes } from "@/interfaces/transaction.interface";
import { Badge } from "../ui/badge";

interface VoucherBadgeProps {
	type: VoucherTypes;
	count: number;
}

const voucherTypeColors: Record<VoucherTypes, string> = {
	travel: "bg-blue-700 text-white",
	accommodation: "bg-green-700 text-white",
	tour: "bg-yellow-600 text-white",
	transport: "bg-red-700 text-white",
}

export function VoucherBadge({ type, count }: VoucherBadgeProps) {
	const colorClass = voucherTypeColors[type];

	return (
		<Badge className={`text-[8px] w-fit min-w-[10px] justify-center gap-x-2 ${colorClass} cursor-pointer`}>
			<p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
			<div className="rounded-full w-[14px] h-[14px] bg-white items-center justify-center flex">
				<p className="text-[8px] text-black">{count}</p>
			</div>
		</Badge>
	);
}
