
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-beige">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center gap-4 border-b border-olive/10">
        <Link to="/help" className="text-olive hover:bg-beige-light p-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-olive">Terms & Conditions</h1>
      </header>

      <div className="p-6 max-w-3xl mx-auto space-y-6 text-olive/80">
        <p className="text-sm italic">Effective Date: March 14, 2024</p>
        
        <div className="prose prose-olive max-w-none space-y-6">
          <p>Welcome to MindfulPlate! By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions.</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-olive">1. Acceptance & Eligibility</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>By using MindfulPlate, you agree to these Terms</li>
              <li>You must be at least 13 years old to use the platform</li>
              <li>You are responsible for maintaining account security</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-olive">2. Acceptable Use</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Do not post harmful or offensive content</li>
              <li>Do not harass or impersonate others</li>
              <li>Do not use the platform for unauthorized commercial purposes</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-olive">3. Content & Ownership</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You retain ownership of your content</li>
              <li>You grant MindfulPlate license to display your content</li>
              <li>We may remove content that violates these Terms</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-olive">4. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms without prior notice.</p>
          </section>

          <section className="mt-8 pt-4 border-t border-olive/10">
            <p className="text-sm">
              For questions about these Terms, please contact us at{" "}
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

export default Terms;
