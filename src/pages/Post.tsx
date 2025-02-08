
import BottomNav from "@/components/BottomNav";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className="min-h-screen bg-beige pb-20">
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg p-4 z-40 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-olive italic">MindfulPlate</h1>
        <Link to="/profile" className="p-2 hover:bg-beige-light rounded-full transition-colors">
          <User className="w-6 h-6 text-olive" />
        </Link>
      </header>
      <div className="p-4">
        <p className="text-center text-gray-500">Post creation coming soon...</p>
      </div>
      <BottomNav />
    </div>
  );
};

export default Post;
