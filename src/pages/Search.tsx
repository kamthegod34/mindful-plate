
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Search as SearchIcon, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedDiet, setSelectedDiet] = useState<string>("");

  // Mock data for demonstration
  const searchResults = [
    { type: "user", id: 1, username: "healthyeats", name: "Healthy Eats", avatar: "/placeholder.svg" },
    { type: "hashtag", id: 2, name: "#vegetarian", postsCount: 1234 },
    { type: "community", id: 3, name: "Vegan Foodies", membersCount: 5678, avatar: "/placeholder.svg" },
  ];

  const dietaryFilters = [
    { value: "all", label: "All" },
    { value: "vegan", label: "Vegan" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "pescatarian", label: "Pescatarian" },
    { value: "keto", label: "Keto" },
    { value: "paleo", label: "Paleo" },
  ];

  return (
    <div className="min-h-screen bg-beige pb-20">
      <header className="bg-beige p-4 z-40 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-olive italic">MindfulPlate</h1>
        <Link to="/profile" className="p-2 hover:bg-beige-light rounded-full transition-colors">
          <User className="w-6 h-6 text-olive" />
        </Link>
      </header>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search users, hashtags, or communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-white/80 border-gray-200 focus:ring-0 focus:border-olive/30 caret-[#F2FCE2]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Filters */}
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
            </SelectContent>
          </Select>

          <Select value={selectedDiet} onValueChange={setSelectedDiet}>
            <SelectTrigger className="w-[140px] bg-white/80">
              <SelectValue placeholder="Dietary" />
            </SelectTrigger>
            <SelectContent>
              {dietaryFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Results */}
        <div className="space-y-2">
          {searchResults.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              className="flex items-center p-3 bg-white/80 rounded-lg hover:bg-white transition-colors"
            >
              {result.type === "user" || result.type === "community" ? (
                <>
                  <img
                    src={(result as any).avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{(result as any).username || result.name}</p>
                    {result.type === "community" && (
                      <p className="text-sm text-gray-500">
                        {(result as any).membersCount.toLocaleString()} members
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="py-2">
                  <p className="font-semibold">{result.name}</p>
                  <p className="text-sm text-gray-500">
                    {(result as any).postsCount.toLocaleString()} posts
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Search;
