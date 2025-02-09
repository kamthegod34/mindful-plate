
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const SearchHeader = () => {
  return (
    <header className="bg-beige p-4 z-40 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-olive italic">MindfulPlate</h1>
      <Link to="/profile" className="p-2 hover:bg-beige-light rounded-full transition-colors">
        <User className="w-6 h-6 text-olive" />
      </Link>
    </header>
  );
};

export default SearchHeader;

