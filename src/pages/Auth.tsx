
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, User, Mail, Lock } from "lucide-react";
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

  const handleGoogleSignIn = () => {
    // Add Google authentication logic here
    console.log("Google sign in clicked");
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center p-4">
      <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Welcome text */}
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

        {/* Right side - Auth form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-olive mb-6">
              {isSignIn ? "Sign In" : "Create Account"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-olive/40" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-olive/40" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
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

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-olive/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-olive/40">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="text-center text-sm text-olive/60 mt-6">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
