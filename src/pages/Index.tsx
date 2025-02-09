
import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, ChevronRight, ChevronLeft, User } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Post, Comment } from "@/types/post";
import { CommentModal } from "@/components/CommentModal";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<Record<number, number>>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch posts");
    } else if (data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const fetchUserLikes = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("likes")
      .select("post_id")
      .eq("user_id", user.id);

    if (data) {
      setLikedPosts(new Set(data.map(like => like.post_id)));
    }
  };

  const fetchComments = async (postId: string) => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch comments");
    } else if (data) {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUserLikes();

    // Set up realtime subscriptions
    const postsSubscription = supabase
      .channel('public:posts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'posts' },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    const likesSubscription = supabase
      .channel('public:likes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'likes' },
        () => {
          fetchPosts();
          fetchUserLikes();
        }
      )
      .subscribe();

    const commentsSubscription = supabase
      .channel('public:comments')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'comments' },
        () => {
          if (selectedPostId) {
            fetchComments(selectedPostId);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postsSubscription);
      supabase.removeChannel(likesSubscription);
      supabase.removeChannel(commentsSubscription);
    };
  }, [selectedPostId]);

  const handleLike = async (postId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please sign in to like posts");
      return;
    }

    const isLiked = likedPosts.has(postId);

    if (isLiked) {
      await supabase
        .from("likes")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", postId);
      
      setLikedPosts(prev => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
    } else {
      const { error } = await supabase
        .from("likes")
        .insert({ user_id: user.id, post_id: postId });

      if (!error) {
        setLikedPosts(prev => new Set([...prev, postId]));
      }
    }
  };

  const handleCommentClick = async (postId: string) => {
    setSelectedPostId(postId);
    await fetchComments(postId);
    setIsCommentModalOpen(true);
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prev => [newComment, ...prev]);
  };

  const nextImage = (postId: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [postId]: Math.min((prev[postId] || 0) + 1, 1),
    }));
  };

  const prevImage = (postId: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [postId]: Math.max((prev[postId] || 0) - 1, 0),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-olive animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige pb-20">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center justify-between border-b border-olive/10">
        <h1 className="text-2xl font-bold text-olive italic">MindfulPlate</h1>
        <Link to="/profile" className="p-2 hover:bg-beige-light rounded-full transition-colors">
          <User className="w-6 h-6 text-olive" />
        </Link>
      </header>

      <div className="max-w-xl mx-auto p-4 space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden animate-slide-up">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-beige-dark"></div>
                <span className="font-medium">{post.user_id}</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.image_url || "/placeholder.svg"}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="p-4 flex items-center space-x-4">
              <button 
                className={`text-gray-700 hover:text-olive transition-colors ${
                  likedPosts.has(post.id) ? "text-red-500" : ""
                }`}
                onClick={() => handleLike(post.id)}
              >
                <Heart className={`w-6 h-6 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
              </button>
              <button 
                className="text-gray-700 hover:text-olive transition-colors"
                onClick={() => handleCommentClick(post.id)}
              >
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="text-gray-700 hover:text-olive transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            <div className="px-4 pb-4">
              <div className="flex space-x-4 text-sm mb-2">
                <span>{post.likes_count || 0} likes</span>
                <span>{post.comments_count || 0} comments</span>
              </div>
              <p>
                <span className="font-medium">{post.user_id}</span>{" "}
                {post.caption}
              </p>
            </div>
          </article>
        ))}
      </div>

      <CommentModal
        postId={selectedPostId || ""}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        comments={comments}
        onCommentAdded={handleCommentAdded}
      />

      <BottomNav />
    </div>
  );
};

export default Index;
