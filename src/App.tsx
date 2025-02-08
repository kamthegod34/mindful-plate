
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Post from "./pages/Post";
import Fridge from "./pages/Fridge";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import FAQs from "./pages/FAQs";
import NotFound from "./pages/NotFound";
import SavedPosts from "./pages/SavedPosts";
import LikedPosts from "./pages/LikedPosts";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search" element={<Search />} />
          <Route path="/post" element={<Post />} />
          <Route path="/fridge" element={<Fridge />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/saved" element={<SavedPosts />} />
          <Route path="/liked" element={<LikedPosts />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
