
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-beige flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-xl"
      >
        <h1 className="text-4xl font-bold text-olive mb-4 italic">
          MindfulPlate
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-olive/80 text-lg"
        >
          Share your food journey, track nutrition, and connect with a community
          that celebrates mindful eating. Every meal tells a story – what's yours?
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignIn && (
            <Button
              variant="link"
              className="px-0 text-olive/60 hover:text-olive"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Button>
          )}

          <Button type="submit" className="w-full bg-olive hover:bg-olive/90">
            {isSignIn ? "Sign In" : "Create Account"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center text-sm text-olive/60">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <Button
              variant="link"
              className="text-olive hover:text-olive/90 p-0"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
