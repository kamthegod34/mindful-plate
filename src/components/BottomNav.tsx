
import { Home, Search, PlusSquare, UtensilsCrossed, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 py-2 px-4 flex justify-around items-center z-50">
      <Link to="/" className={`p-2 rounded-lg transition-colors ${isActive("/") ? "text-olive" : "text-gray-500"}`}>
        <Home className="w-6 h-6" />
      </Link>
      <Link to="/search" className={`p-2 rounded-lg transition-colors ${isActive("/search") ? "text-olive" : "text-gray-500"}`}>
        <Search className="w-6 h-6" />
      </Link>
      <Link to="/post" className={`p-2 rounded-lg transition-colors ${isActive("/post") ? "text-olive" : "text-gray-500"}`}>
        <PlusSquare className="w-6 h-6" />
      </Link>
      <Link to="/fridge" className={`p-2 rounded-lg transition-colors ${isActive("/fridge") ? "text-olive" : "text-gray-500"}`}>
        <UtensilsCrossed className="w-6 h-6" />
      </Link>
      <Link to="/profile" className={`p-2 rounded-lg transition-colors ${isActive("/profile") ? "text-olive" : "text-gray-500"}`}>
        <User className="w-6 h-6" />
      </Link>
    </nav>
  );
};

export default BottomNav;
