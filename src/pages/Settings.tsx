
import { ArrowLeft, Heart, Bell, HelpCircle, Info, LogOut, Bookmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="min-h-screen bg-beige">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center gap-4 border-b border-olive/10">
        <Link to="/profile" className="text-olive hover:bg-beige-light p-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-olive">Settings</h1>
      </header>

      <div className="p-6 space-y-6">
        <div className="space-y-1">
          {[
            { icon: Bookmark, label: "Saved Posts", path: "/saved" },
            { icon: Heart, label: "Liked Posts", path: "/liked" },
            { icon: Bell, label: "Notifications", path: "/notifications" },
            { icon: HelpCircle, label: "Help", path: "/help" },
            { icon: Info, label: "About", path: "/about" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center justify-between py-3 px-1 text-olive hover:bg-beige-light rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-olive/60" />
            </Link>
          ))}
          <Separator className="my-4 bg-olive/10" />
          <button className="flex items-center gap-3 py-3 px-1 text-red-500 hover:bg-beige-light rounded-lg transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
