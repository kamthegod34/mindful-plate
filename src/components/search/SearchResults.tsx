
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

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  searchQuery: string;
}

const SearchResults = ({ results, loading, searchQuery }: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-olive" />
      </div>
    );
  }

  if (!loading && searchQuery && results.length === 0) {
    return <p className="text-center text-gray-500 py-8">No results found</p>;
  }

  return (
    <div className="space-y-2">
      {results.map((result) => (
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
      ))}
    </div>
  );
};

export default SearchResults;

