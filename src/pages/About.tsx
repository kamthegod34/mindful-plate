
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-beige">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center gap-4 border-b border-olive/10">
        <Link to="/settings" className="text-olive hover:bg-beige-light p-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-olive">About</h1>
      </header>

      <div className="p-6 space-y-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-olive text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Redefining Food Culture,{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="inline-block"
          >
            One Post at a Time
          </motion.span>
        </motion.h2>

        <div className="prose prose-olive max-w-none space-y-6">
          <p className="text-lg">
            We're three university students who love food—but we also know how overwhelming today's food culture can be. 
            From unrealistic expectations to fad diets and unhealthy comparisons, social media has often turned eating into 
            something stressful rather than enjoyable. That's why we built Nekter—a social media platform dedicated exclusively 
            to food, where eating isn't about judgment, but about sharing, celebrating, and inspiring.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              🍽️ Our Mission
            </h3>
            <p>
              We want to create a healthier, more positive food culture—one where you can share your meals without the pressure 
              of perfection. Whether it's a gourmet dish, a home-cooked meal, or a midnight snack, every post is a celebration 
              of real food and real people.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              💬 What We Do
            </h3>
            <p>
              Just like your favorite social media platforms, Nekter lets you post your meals, share recipes, and engage with 
              a like-minded community. React to posts, leave comments, and explore food inspiration from around the world—all 
              without the toxicity of unrealistic beauty standards or diet culture.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              🌿 Why It Matters
            </h3>
            <p>
              We believe that food should be about joy, not guilt. Whether you're a foodie, a home chef, or just someone trying 
              to eat better, Nekter is here to bring back the fun, connection, and creativity of eating.
            </p>
          </div>

          <p className="text-lg">
            So go ahead—post your plate, share your cravings, and join us in making food social again.
          </p>

          <p className="text-xl font-semibold text-center">
            🥗 Welcome to Nekter—where every meal is worth sharing. 🍲✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
