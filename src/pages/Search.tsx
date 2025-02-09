
import { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import SearchHeader from "@/components/search/SearchHeader";
import SearchBar from "@/components/search/SearchBar";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";

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
  const [selectedDiet, setSelectedDiet] = useState<string>("all");
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

      if ((activeFilter === "all" || activeFilter === "dietary") && selectedDiet === "all") {
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
      <SearchHeader />
      <div className="p-4 space-y-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
        />
        <SearchFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          selectedDiet={selectedDiet}
          setSelectedDiet={setSelectedDiet}
        />
        <SearchResults
          results={results}
          loading={loading}
          searchQuery={searchQuery}
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default Search;

