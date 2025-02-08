
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { User, Camera, Image as ImageIcon, X, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface MediaFile {
  url: string;
  type: "image" | "video";
}

const Post = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [showMacros, setShowMacros] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showTimeAndCost, setShowTimeAndCost] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: MediaFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        newFiles.push({
          url: URL.createObjectURL(file),
          type: file.type.startsWith("image/") ? "image" : "video",
        });
      }
    });

    if (newFiles.length + mediaFiles.length > 10) {
      toast({
        title: "Too many files",
        description: "You can only upload up to 10 files",
        variant: "destructive",
      });
      return;
    }

    setMediaFiles([...mediaFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm p-4 z-40 flex items-center justify-between border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">MindfulPlate</h1>
        <Link to="/profile" className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <User className="w-5 h-5 text-gray-700" />
        </Link>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-8">
        {/* Media Upload Section */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <Label
              htmlFor="camera"
              className="flex-1 h-40 border border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group"
            >
              <Camera className="w-6 h-6 text-gray-400 group-hover:text-gray-600 mb-2" />
              <span className="text-sm text-gray-500 group-hover:text-gray-700">Take Photo</span>
              <Input
                id="camera"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileSelect}
              />
            </Label>

            <Label
              htmlFor="gallery"
              className="flex-1 h-40 border border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group"
            >
              <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-600 mb-2" />
              <span className="text-sm text-gray-500 group-hover:text-gray-700">Upload Media</span>
              <Input
                id="gallery"
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </Label>
          </div>

          {/* Preview Section */}
          {mediaFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {mediaFiles.map((file, index) => (
                <div key={index} className="relative aspect-square group">
                  {file.type === "image" ? (
                    <img
                      src={file.url}
                      alt=""
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <video
                      src={file.url}
                      className="w-full h-full object-cover rounded-xl"
                      controls
                    />
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
              {mediaFiles.length < 10 && (
                <Label
                  htmlFor="add-more"
                  className="aspect-square border border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group"
                >
                  <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <Input
                    id="add-more"
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </Label>
              )}
            </div>
          )}
        </div>

        {/* Options Section */}
        <div className="space-y-3 bg-gray-50/50 p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="show-macros"
              checked={showMacros}
              onCheckedChange={(checked) => setShowMacros(checked as boolean)}
              className="data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800"
            />
            <Label htmlFor="show-macros" className="text-gray-700">Show Macros</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="show-ingredients"
              checked={showIngredients}
              onCheckedChange={(checked) => setShowIngredients(checked as boolean)}
              className="data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800"
            />
            <Label htmlFor="show-ingredients" className="text-gray-700">Show Ingredients</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="show-time-cost"
              checked={showTimeAndCost}
              onCheckedChange={(checked) => setShowTimeAndCost(checked as boolean)}
              className="data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800"
            />
            <Label htmlFor="show-time-cost" className="text-gray-700">Show Time & Cost</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="show-location"
              checked={showLocation}
              onCheckedChange={(checked) => setShowLocation(checked as boolean)}
              className="data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800"
            />
            <Label htmlFor="show-location" className="text-gray-700">Show Location</Label>
          </div>
        </div>

        {/* Post Button */}
        <Button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-xl text-base font-medium transition-colors"
          disabled={mediaFiles.length === 0}
        >
          Post
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Post;
