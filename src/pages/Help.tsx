
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        {/* Support Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-olive">Help & Support – Nektar AI Assistant</h2>
          <p className="text-olive/80">Need quick answers? Our AI-powered assistant is here to help.</p>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔹</span>
              <p className="text-olive/80">Instant Support – Get answers to common questions, troubleshoot issues, and find help on the go.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔹</span>
              <p className="text-olive/80">24/7 Availability – No waiting times—our chatbot is always ready to assist.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔹</span>
              <p className="text-olive/80">Seamless Integration – Powered by AI, trained to assist with posting, reporting issues, and managing your account.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-olive/80">
              <span className="text-xl">💬</span> Talk to Nektar AI – Access the chatbot in Settings {'->'} Help & Support or via our website.
            </p>
            <p className="text-olive/80">
              For further assistance, contact{" "}
              <a href="mailto:support@nektarapp.com" className="text-olive hover:underline">
                support@nektarapp.com
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-1 mt-6">
          {[
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
