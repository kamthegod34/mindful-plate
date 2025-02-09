
import { motion } from "framer-motion";

export const WelcomeMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:block space-y-6 pr-8"
    >
      <h1 className="text-4xl font-bold text-olive mb-6">Welcome to Nektar!</h1>
      <div className="space-y-4 text-olive/80">
        <p>
          Nektar is more than just a social platform—it's a community built around
          the love of food. Whether you're a home cook, a culinary adventurer,
          or someone who simply enjoys a good meal, Nektar is the perfect place
          to share your passion and connect with like-minded individuals.
        </p>
        <p>
          Our mission is to create a positive and inspiring space where food
          lovers can celebrate the diversity of global cuisines, share their
          creations, and discover new ideas—all without the pressure of
          perfection. At Nektar, every meal is a story worth sharing.
        </p>
        <p>
          Join us and be part of a community where food isn't just about what's
          on the plate—it's about the memories, creativity, and joy it brings.
        </p>
        <p className="font-semibold">Eat. Share. Connect.</p>
      </div>
    </motion.div>
  );
};
