import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SelectionToggle = ({
  dateRange,
  setDateRange,
}: {
  dateRange: string;
  setDateRange: (value: string) => void;
}) => {
  return (
    <div>
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Last 7 days" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Today So Far</SelectItem>
          <SelectItem value="2">Last 7 days</SelectItem>
          <SelectItem value="3">Last 30 days</SelectItem>
          <SelectItem value="4">Last 90 days</SelectItem>
          <SelectItem value="5">Last 365 days</SelectItem>
          <SelectItem value="6">All time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectionToggle;
