
import BottomNav from "@/components/BottomNav";

const Profile = () => {
  return (
    <div className="min-h-screen bg-beige pb-20">
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4 z-40">
        <h1 className="text-2xl font-semibold text-olive text-center">Profile</h1>
      </header>
      <div className="p-4">
        <p className="text-center text-gray-500">Profile functionality coming soon...</p>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;
