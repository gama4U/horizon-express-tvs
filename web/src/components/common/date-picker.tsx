import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "lucide-react"

interface Props {
  value: Date;
  onValueChange: (value: Date | undefined) => void;
}
export function DatePicker({value, onValueChange}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal text-[12px]",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(value) => onValueChange(value)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
