
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <div className="min-h-screen bg-beige">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center gap-4 border-b border-olive/10">
        <Link to="/help" className="text-olive hover:bg-beige-light p-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-olive">FAQs</h1>
      </header>

      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-olive mb-6">FAQs – Your Food Journey Guide 🍽️</h2>
        
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="what-is">
            <AccordionTrigger className="text-olive hover:no-underline">
              What is Nektar?
            </AccordionTrigger>
            <AccordionContent className="text-olive/80">
              Nektar is a social media platform built around food. Share what you eat, explore new dishes, and engage in a positive, non-toxic food culture. Whether it's your home-cooked meal, a restaurant dish, or a snack, every meal is worth sharing!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="posting">
            <AccordionTrigger className="text-olive hover:no-underline">
              How do I post my food photos?
            </AccordionTrigger>
            <AccordionContent className="text-olive/80">
              Tap the "+" button, upload your meal photo, add a caption, tag ingredients or restaurants, and hit Post!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="edit-delete">
            <AccordionTrigger className="text-olive hover:no-underline">
              Can I edit or delete my posts?
            </AccordionTrigger>
            <AccordionContent className="text-olive/80">
              Yes! Go to your profile, select a post, and choose Edit or Delete from the menu.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="find-people">
            <AccordionTrigger className="text-olive hover:no-underline">
              How do I find people to follow?
            </AccordionTrigger>
            <AccordionContent className="text-olive/80">
              Use the Explore tab to discover trending posts or search for users based on food preferences and hashtags.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="save-posts">
            <AccordionTrigger className="text-olive hover:no-underline">
              Can I save posts for later?
            </AccordionTrigger>
            <AccordionContent className="text-olive/80">
              Yes! Tap the "Save" button on any post to bookmark it for future inspiration. You can find all your saved posts in your profile settings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
