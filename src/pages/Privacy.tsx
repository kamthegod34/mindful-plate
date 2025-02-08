
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-beige">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center gap-4 border-b border-olive/10">
        <Link to="/help" className="text-olive hover:bg-beige-light p-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-olive">Privacy Policy</h1>
      </header>

      <div className="p-6 max-w-3xl mx-auto space-y-6 text-olive/80">
        <p className="text-sm italic">Effective Date: March 14, 2024</p>
        
        <div className="prose prose-olive max-w-none space-y-6">
          <p>Welcome to MindfulPlate, a social media platform for food lovers. Your privacy is important to us, and this Privacy Policy explains how we collect, use, disclose, and protect your information when you use our platform.</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-olive">1. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Account Information: When you sign up, we collect your username, email address, and password.</li>
              <li>Profile Information: You may choose to add a profile picture, bio, and other optional details.</li>
              <li>User Content: Any photos, recipes, comments, and other interactions you post on the platform.</li>
              <li>Usage Data: Information on how you interact with MindfulPlate.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-olive">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your content experience</li>
              <li>Ensure a safe and respectful community</li>
              <li>Communicate important updates</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-olive">3. Your Choices</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Edit or delete your profile information</li>
              <li>Adjust privacy settings</li>
              <li>Manage notification preferences</li>
              <li>Request account deletion</li>
            </ul>
          </section>

          <section className="mt-8 pt-4 border-t border-olive/10">
            <p className="text-sm">
              For questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:support@mindfulplate.com" className="text-olive hover:underline">
                support@mindfulplate.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
