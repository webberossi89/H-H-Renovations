import { useEffect } from "react";
import { CheckCircle, Phone } from "lucide-react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Post-submission confirmation page. Youform is configured to redirect here
 * after a successful submit. On mount we push a dataLayer event so Google Tag
 * Manager (GTM-5D76XNVZ) can fire GA4 + Google Ads conversion tags. Attribution
 * (gclid/utm) rides along via the WhatConverts session set on the landing page.
 */
export default function ThankYou() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_form_submit",
      form_id: "mqxfscuq",
      form_name: "H&H Bathroom Remodel Consultation",
    });
  }, []);

  return (
    <div className="min-h-screen bg-secondary/5 flex flex-col items-center justify-center text-center px-6 py-20 font-sans">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-7">
        <CheckCircle className="w-11 h-11 text-green-600" />
      </div>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
        Thank You! Your Request Was Received
      </h1>
      <p className="text-gray-600 text-lg max-w-xl mb-8">
        A member of our Palm Beach team will be in touch shortly to discuss your
        bathroom remodel. If you need immediate help, call us directly.
      </p>
      <a
        href="tel:5618884488"
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg px-7 py-3.5 shadow-lg shadow-primary/25 transition-colors"
      >
        <Phone className="w-5 h-5" /> (561) 888-4488
      </a>
      <a href="/" className="mt-6 text-sm font-semibold text-secondary hover:text-primary transition-colors">
        Back to home
      </a>
    </div>
  );
}
