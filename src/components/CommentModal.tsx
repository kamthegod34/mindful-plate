
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Comment } from "@/types/post";
import { toast } from "sonner";
import { User } from "lucide-react";

interface CommentModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onCommentAdded: (comment: Comment) => void;
}

export const CommentModal = ({ postId, isOpen, onClose, comments, onCommentAdded }: CommentModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please sign in to comment");
      return;
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({
        content: newComment.trim(),
        post_id: postId,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to add comment");
    } else if (data) {
      onCommentAdded(data);
      setNewComment("");
      toast.success("Comment added!");
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-2 p-2 bg-beige/20 rounded-lg">
              <User className="w-6 h-6 text-olive/60" />
              <div>
                <p className="text-sm text-gray-600">{comment.content}</p>
                <span className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmitComment} className="flex gap-2 mt-4">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1"
          />
          <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
            Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
