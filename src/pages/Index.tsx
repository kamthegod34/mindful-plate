
import { useState } from "react";
import { Heart, MessageCircle, Share2, ChevronRight, ChevronLeft, User } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  username: string;
  images: string[];
  caption: string;
  likes: number;
  comments: number;
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  location?: string;
}

const mockPosts: Post[] = [
  {
    id: 1,
    username: "healthyeats",
    images: ["/placeholder.svg", "/placeholder.svg"],
    caption: "Perfect breakfast bowl to start the day! 🥑",
    likes: 234,
    comments: 12,
    macros: {
      protein: 20,
      carbs: 35,
      fat: 15,
    },
    location: "San Francisco, CA",
  },
  // Add more mock posts here
];

const Index = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<Record<number, number>>({});

  const nextImage = (postId: number, total: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [postId]: Math.min((prev[postId] || 0) + 1, total - 1),
    }));
  };

  const prevImage = (postId: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [postId]: Math.max((prev[postId] || 0) - 1, 0),
    }));
  };

  return (
    <div className="min-h-screen bg-beige pb-20">
      <header className="sticky top-0 bg-beige p-4 z-40 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-olive italic">MindfulPlate</h1>
        <Link to="/profile" className="p-2 hover:bg-beige-light rounded-full transition-colors">
          <User className="w-6 h-6 text-olive" />
        </Link>
      </header>

      <div className="max-w-xl mx-auto p-4 space-y-6">
        {mockPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden animate-slide-up">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-beige-dark"></div>
                <span className="font-medium">{post.username}</span>
              </div>
              {post.location && (
                <span className="text-sm text-gray-500">{post.location}</span>
              )}
            </div>

            <div className="relative">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.images[activeImageIndex[post.id] || 0]}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
                {post.images.length > 1 && (
                  <>
                    {activeImageIndex[post.id] > 0 && (
                      <button
                        onClick={() => prevImage(post.id)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                      </button>
                    )}
                    {(activeImageIndex[post.id] || 0) < post.images.length - 1 && (
                      <button
                        onClick={() => nextImage(post.id, post.images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="p-4 flex items-center space-x-4">
              <button className="text-gray-700 hover:text-olive transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="text-gray-700 hover:text-olive transition-colors">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="text-gray-700 hover:text-olive transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            <div className="px-4 pb-4">
              <p className="mb-2">
                <span className="font-medium">{post.username}</span>{" "}
                {post.caption}
              </p>
              {post.macros && (
                <div className="mt-2 flex space-x-4 text-sm text-gray-600">
                  <span>🥩 {post.macros.protein}g protein</span>
                  <span>🍚 {post.macros.carbs}g carbs</span>
                  <span>🥑 {post.macros.fat}g fat</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
