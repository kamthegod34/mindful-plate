
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SavedPosts = () => {
  return (
    <div className="min-h-screen bg-beige">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center gap-4 border-b border-olive/10">
        <Link to="/settings" className="text-olive hover:bg-beige-light p-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-olive">Saved Posts</h1>
      </header>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Posts grid will be implemented here */}
        <div className="text-olive/60 text-center py-12">No saved posts yet</div>
      </div>
    </div>
  );
};

export default SavedPosts;
