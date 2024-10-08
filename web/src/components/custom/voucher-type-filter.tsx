import { VoucherTypes } from "@/interfaces/transaction.interface";
import clsx from "clsx";
import AnimatedDiv from "../animated/Div";
import { CircleCheck } from "lucide-react";

interface VoucherTypeFilterProps {
	type: VoucherTypes
	selected: boolean;
	onToggle: (type: VoucherTypes) => void;
}

export function VoucherTypeFilter({ type, selected, onToggle }: VoucherTypeFilterProps) {
	const handleToggle = () => {
		onToggle(type);
	};

	return (
		<div
			className={clsx(
				"cursor-pointer px-3 rounded-sm py-1 transition-all duration-300 text-xs flex flex-row items-center gap-x-2",
				selected ? "bg-primary text-white border-primary" : "bg-gray-200 text-gray-600 border-gray-300"
			)}
			onClick={handleToggle}
		>
			{type.charAt(0).toUpperCase() + type.slice(1)}
			{selected &&
				<AnimatedDiv animationType="Glowing" repeatDelay={0.5}>
					<CircleCheck size={18} />
				</AnimatedDiv>}
		</div>
	);
}
