
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="min-h-screen bg-beige">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center gap-4 border-b border-olive/10">
        <Link to="/settings" className="text-olive hover:bg-beige-light p-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-olive">Help</h1>
      </header>

      <div className="p-6 space-y-6">
        <div className="space-y-1">
          {[
            { label: "Nektar AI Support", path: "/support" },
            { label: "FAQs", path: "/faqs" },
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Terms & Conditions", path: "/terms" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center justify-between py-3 px-1 text-olive hover:bg-beige-light rounded-lg transition-colors"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 text-olive/60" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
