
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
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-olive mb-4">FAQs – MindfulPlate: Your Food Journey 🍽️</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="what-is">
              <AccordionTrigger className="text-olive hover:no-underline">
                What is MindfulPlate?
              </AccordionTrigger>
              <AccordionContent className="text-olive/80">
                MindfulPlate is a social platform that helps you share your food journey, track your nutrition, and connect with others who love food. Share meals, discover recipes, and join a community that celebrates mindful eating.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="post">
              <AccordionTrigger className="text-olive hover:no-underline">
                How do I post my food photos?
              </AccordionTrigger>
              <AccordionContent className="text-olive/80">
                Tap the "+" button in the navigation bar, upload your meal photo, add details like ingredients and macros, write a caption, and share with the community!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="save">
              <AccordionTrigger className="text-olive hover:no-underline">
                Can I save posts for later?
              </AccordionTrigger>
              <AccordionContent className="text-olive/80">
                Yes! Tap the bookmark icon on any post to save it to your collection. View all saved posts in your settings under "Saved Posts."
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="notifications">
              <AccordionTrigger className="text-olive hover:no-underline">
                How do I manage notifications?
              </AccordionTrigger>
              <AccordionContent className="text-olive/80">
                Go to Settings > Notifications to customize your notification preferences, including push notifications and temporary muting options.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger className="text-olive hover:no-underline">
                Who can see my posts?
              </AccordionTrigger>
              <AccordionContent className="text-olive/80">
                Your posts are public by default, allowing the community to discover and engage with your content. Profile privacy settings will be available soon.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-1 mt-6">
          {[
            { label: "Support", path: "/support" },
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
