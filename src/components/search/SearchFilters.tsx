
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  selectedDiet: string;
  setSelectedDiet: (diet: string) => void;
}

const SearchFilters = ({
  activeFilter,
  setActiveFilter,
  selectedDiet,
  setSelectedDiet,
}: SearchFiltersProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <Select value={activeFilter} onValueChange={setActiveFilter}>
        <SelectTrigger className="w-[140px] bg-white/80">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="users">Users</SelectItem>
          <SelectItem value="hashtags">Hashtags</SelectItem>
          <SelectItem value="communities">Communities</SelectItem>
          <SelectItem value="dietary">Dietary</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedDiet} onValueChange={setSelectedDiet}>
        <SelectTrigger className="w-[140px] bg-white/80">
          <SelectValue placeholder="Dietary" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="vegan">Vegan</SelectItem>
          <SelectItem value="vegetarian">Vegetarian</SelectItem>
          <SelectItem value="pescatarian">Pescatarian</SelectItem>
          <SelectItem value="keto">Keto</SelectItem>
          <SelectItem value="paleo">Paleo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;

