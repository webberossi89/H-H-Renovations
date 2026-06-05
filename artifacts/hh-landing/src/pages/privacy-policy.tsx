import { useEffect } from "react";
import { ArrowLeft, Phone } from "lucide-react";
import logoPath from "@assets/hh-logo.jpg";

/**
 * Standard privacy policy for the H&H lead-gen landing page. Plain content page
 * served at /privacy-policy (SPA route). Should be reviewed by counsel before
 * being treated as final legal text.
 */
export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | H&H Signature Renovations";
  }, []);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-8">
      <h2 className="text-xl font-serif font-bold text-secondary mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3 text-[0.95rem]">{children}</div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 h-[70px] flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logoPath} alt="H&H Signature Renovations" className="h-10 w-auto object-contain" />
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-3xl py-14">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: June 2026</p>

        <p className="text-gray-600 leading-relaxed mb-8 text-[0.95rem]">
          This Privacy Policy explains how H&amp;H Signature Renovations ("H&amp;H," "we," "us," or
          "our") collects, uses, and shares information when you visit our website or contact us
          about a bathroom remodeling project. By using this site or submitting a form, you agree to
          the practices described below.
        </p>

        <Section title="Information We Collect">
          <p><strong>Information you provide:</strong> When you complete our contact or estimate
          form or call us, we may collect your name, phone number, email address, project details,
          budget, timeline, and any other information you choose to share.</p>
          <p><strong>Information collected automatically:</strong> Like most websites, we
          automatically collect technical data such as your IP address, browser type, device
          information, referring pages, and how you interact with the site, using cookies and similar
          technologies.</p>
        </Section>

        <Section title="How We Use Your Information">
          <p>We use the information we collect to respond to your inquiries, schedule and provide
          estimates, deliver our services, improve our website and marketing, measure advertising
          performance, and contact you about your project. We may also use it to comply with legal
          obligations.</p>
        </Section>

        <Section title="How We Share Information">
          <p>We do not sell your personal information. We may share it with trusted service providers
          who help us operate our business, including website form processing, call and form lead
          tracking, and analytics and advertising platforms (such as Google Analytics and Google
          Ads). These providers may process limited data on our behalf and are expected to protect
          it. We may also disclose information when required by law.</p>
        </Section>

        <Section title="Cookies & Tracking Technologies">
          <p>We use cookies and tracking technologies to understand site usage, improve performance,
          and measure the effectiveness of our advertising. You can control cookies through your
          browser settings, though disabling them may affect how the site functions.</p>
        </Section>

        <Section title="Your Choices">
          <p>You may opt out of marketing communications at any time by contacting us. You can also
          adjust your browser to limit cookies and opt out of personalized advertising through your
          ad-settings preferences with platforms like Google.</p>
        </Section>

        <Section title="Data Security">
          <p>We take reasonable measures to protect the information we collect. However, no method of
          transmission or storage is completely secure, and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="Third-Party Links">
          <p>Our site may link to third-party websites. We are not responsible for the privacy
          practices of those sites and encourage you to review their policies.</p>
        </Section>

        <Section title="Children's Privacy">
          <p>Our services are intended for adults. We do not knowingly collect personal information
          from children under 13.</p>
        </Section>

        <Section title="Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated date.</p>
        </Section>

        <Section title="Contact Us">
          <p>If you have questions about this Privacy Policy, please contact us:</p>
          <a href="tel:5618884488" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
            <Phone className="w-4 h-4" /> (561) 888-4488
          </a>
          <p>H&amp;H Signature Renovations &middot; Serving Palm Beach County &amp; South Florida</p>
        </Section>
      </main>

      <footer className="border-t border-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} H&amp;H Signature Renovations. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
