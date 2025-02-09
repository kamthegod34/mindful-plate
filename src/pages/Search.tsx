
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface SearchResult {
  id: string;
  type: 'user' | 'hashtag' | 'community' | 'dietary';
  name?: string;
  username?: string;
  post_count?: number;
  member_count?: number;
  description?: string;
  profile_picture?: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedDiet, setSelectedDiet] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    if (searchQuery.trim().length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchTerm = `%${searchQuery}%`;
    let data: SearchResult[] = [];

    try {
      if (activeFilter === "all" || activeFilter === "users") {
        const { data: users, error: usersError } = await supabase
          .from("accounts")
          .select("id, username, full_name, profile_picture")
          .ilike("username", searchTerm)
          .limit(5);

        if (!usersError && users) {
          data = [
            ...data,
            ...users.map((user) => ({
              ...user,
              type: "user" as const,
              name: user.full_name,
            })),
          ];
        }
      }

      if (activeFilter === "all" || activeFilter === "hashtags") {
        const { data: hashtags, error: hashtagsError } = await supabase
          .from("hashtags")
          .select("id, name, post_count")
          .ilike("name", searchTerm)
          .limit(5);

        if (!hashtagsError && hashtags) {
          data = [
            ...data,
            ...hashtags.map((hashtag) => ({
              ...hashtag,
              type: "hashtag" as const,
            })),
          ];
        }
      }

      if (activeFilter === "all" || activeFilter === "communities") {
        const { data: communities, error: communitiesError } = await supabase
          .from("communities")
          .select("id, name, member_count, description")
          .ilike("name", searchTerm)
          .limit(5);

        if (!communitiesError && communities) {
          data = [
            ...data,
            ...communities.map((community) => ({
              ...community,
              type: "community" as const,
            })),
          ];
        }
      }

      if ((activeFilter === "all" || activeFilter === "dietary") && !selectedDiet) {
        const { data: dietary, error: dietaryError } = await supabase
          .from("dietary_requirements")
          .select("id, name, description")
          .ilike("name", searchTerm)
          .limit(5);

        if (!dietaryError && dietary) {
          data = [
            ...data,
            ...dietary.map((diet) => ({
              ...diet,
              type: "dietary" as const,
            })),
          ];
        }
      }

      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, activeFilter, selectedDiet]);

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
  };

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
            className="pl-10 pr-10 bg-white/80 border-gray-200 focus:ring-0 focus:border-olive/30"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
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
              <SelectItem value="dietary">Dietary</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDiet} onValueChange={setSelectedDiet}>
            <SelectTrigger className="w-[140px] bg-white/80">
              <SelectValue placeholder="Dietary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
              <SelectItem value="paleo">Paleo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Results */}
        <div className="space-y-2">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-olive" />
            </div>
          ) : (
            results.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                className="flex items-center p-3 bg-white/80 rounded-lg hover:bg-white transition-colors"
              >
                {(result.type === "user" || result.type === "community") && (
                  <>
                    <img
                      src={result.profile_picture || "/placeholder.svg"}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="font-semibold">
                        {result.type === "user" ? result.username : result.name}
                      </p>
                      {result.type === "community" && result.member_count && (
                        <p className="text-sm text-gray-500">
                          {result.member_count.toLocaleString()} members
                        </p>
                      )}
                      {result.description && (
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {result.type === "hashtag" && (
                  <div className="py-2">
                    <p className="font-semibold">#{result.name}</p>
                    {result.post_count && (
                      <p className="text-sm text-gray-500">
                        {result.post_count.toLocaleString()} posts
                      </p>
                    )}
                  </div>
                )}
                {result.type === "dietary" && (
                  <div className="py-2">
                    <p className="font-semibold">{result.name}</p>
                    {result.description && (
                      <p className="text-sm text-gray-500">{result.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
          {!loading && searchQuery && results.length === 0 && (
            <p className="text-center text-gray-500 py-8">No results found</p>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Search;
