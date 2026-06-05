import React, { useState, useEffect, useCallback } from "react";
import { YouformEmbed } from "@/components/youform-embed";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, ShieldCheck, MapPin, Phone, Users, Clock, ArrowRight, BadgeCheck, Sparkles, Home as HomeIcon, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import logoPath from "@assets/hh-logo.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import heroBg from "@assets/hh_project_photos/photo_22.jpg";
import serviceFullRemodel from "@assets/hh_project_photos/photo_15.jpg";
import serviceShower from "@assets/hh_project_photos/photo_17.jpg";
import serviceTile from "@assets/hh_project_photos/photo_03.jpg";
import serviceVanity from "@assets/hh_project_photos/photo_16.jpg";
import serviceAda from "@assets/hh_project_photos/photo_33.jpg";
import serviceFlooring from "@assets/hh_project_photos/photo_57.jpg";
import finalCtaBg from "@assets/hh_project_photos/photo_02.jpg";
import gallery1 from "@assets/hh_project_photos/photo_04.jpg";
import gallery2 from "@assets/hh_project_photos/photo_25.jpg";
import gallery3 from "@assets/hh_project_photos/photo_12.jpg";
import gallery4 from "@assets/hh_project_photos/photo_31.jpg";
import gallery5 from "@assets/hh_project_photos/photo_46.jpg";
import gallery6 from "@assets/hh_project_photos/photo_55.jpg";
import strip1 from "@assets/hh_project_photos/photo_19.jpg";
import strip2 from "@assets/hh_project_photos/photo_44.jpg";
import strip3 from "@assets/hh_project_photos/photo_21.jpg";
import strip4 from "@assets/hh_project_photos/photo_52.jpg";
import strip5 from "@assets/hh_project_photos/photo_24.jpg";
import strip6 from "@assets/hh_project_photos/photo_64.jpg";
import strip7 from "@assets/hh_project_photos/photo_27.jpg";
import strip8 from "@assets/hh_project_photos/photo_58.jpg";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().optional(),
  services: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one service.",
  }),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = (i: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" } },
});

export default function Home() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [miniSubmitted, setMiniSubmitted] = useState(false);
  const [miniName, setMiniName] = useState("");
  const [miniPhone, setMiniPhone] = useState("");
  const [miniService, setMiniService] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
  const galleryAlts = [
    "Bathroom remodel by H&H Signature Renovations in Palm Beach",
    "Custom shower and tile work by H&H Signature Renovations",
    "Bathroom vanity remodel in Palm Beach County",
    "Walk-in shower remodel by H&H Signature Renovations",
    "Marble shower detail by H&H Signature Renovations",
    "Completed bathroom renovation in South Florida",
  ];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), [galleryImages.length]);
  const nextPhoto = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % galleryImages.length : null), [galleryImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", address: "", services: [], budget: "", timeline: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
    toast({ title: "Consultation Requested!", description: "We will be in touch with you shortly." });
  }

  function handleMiniSubmit(e: React.FormEvent) {
    e.preventDefault();
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  }

  const stripPhotos = [strip1, strip2, strip3, strip4, strip5, strip6, strip7, strip8];

  return (
    <div className="min-h-screen bg-white text-foreground font-sans">

      {/* ── Announcement Bar ─────────────────────────────── */}
      <div className="bg-primary text-white text-sm font-medium py-2.5 px-4 text-center">
        <span className="hidden sm:inline">📞&nbsp;</span>
        <strong>Palm Beach's Premier Bathroom Remodelers</strong>
        <span className="mx-3 opacity-50">|</span>
        Free Estimates · No Obligation
        <span className="mx-3 opacity-50">|</span>
        <a href="tel:5618884488" className="underline underline-offset-2 hover:text-white/80 font-bold">
          Call (561) 888-4488
        </a>
      </div>

      {/* ── Sticky Header ────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-[70px] flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <img src={logoPath} alt="H&H Signature Renovations" className="h-11 w-auto object-contain" />
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#process" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm flex-shrink-0" data-testid="button-call-header">
            <a href="tel:5618884488">
              <Phone className="w-4 h-4 mr-2" />
              (561) 888-4488
            </a>
          </Button>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Luxury bathroom remodel by H&H Signature Renovations"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 45%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#203857]/92 via-[#203857]/75 to-[#203857]/20" />
        </div>

        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Content */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex-1 max-w-xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Serving Palm Beach &amp; South Florida
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold leading-[1.15] mb-5">
              The Palm Beach Bathroom<br />
              You've Been Picturing,<br />
              <span className="text-primary">Made Real</span>
            </h1>

            <p className="text-lg text-white/85 mb-8 leading-relaxed max-w-lg">
              Imagine walking into a spa-quality bathroom every morning: the tile, the light, the finishes, exactly how you pictured them. We design and build it for you start to finish, with a Palm Beach team you can actually trust.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="relative inline-flex">
                <span className="absolute inset-0 rounded-lg bg-primary animate-ping opacity-20 pointer-events-none" />
                <a href="tel:5618884488" className="relative inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg px-6 py-3.5 text-base transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50" data-testid="button-call-hero">
                  <Phone className="w-4 h-4" />
                  Call (561) 888-4488
                </a>
              </div>
              <a href="#consultation-form" className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg px-6 py-3.5 text-base border border-white/30 backdrop-blur-sm transition-all" data-testid="button-form-scroll-hero">
                Get My Free Estimate
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: Star, label: "88+ Google Reviews" },
                { icon: ShieldCheck, label: "Licensed & Insured" },
                { icon: BadgeCheck, label: "5-Star Rated" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-white/80 font-medium">
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Inline Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }}
            className="w-full lg:w-[400px] flex-shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-secondary px-7 py-5">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Free Estimate · 60 Seconds</p>
                <h2 className="text-xl font-serif font-bold text-white">Tell Us Your Vision</h2>
                <p className="text-sm text-white/75 mt-1">Share a few details and we'll take it from there. No pressure, ever.</p>
              </div>

              <div className="p-3">
                <YouformEmbed formId="mqxfscuq" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ──────────────────────────────────── */}
      <div className="bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "88+", label: "Google Reviews" },
              { value: "5★", label: "Average Rating" },
              { value: "100%", label: "Licensed & Insured" },
              { value: "Local", label: "Palm Beach Experts" },
            ].map(({ value, label }, i) => (
              <div key={i} className="px-6 py-6 text-center">
                <div className="text-2xl font-serif font-bold text-primary">{value}</div>
                <div className="text-sm text-white/65 mt-0.5 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Photo Strip ──────────────────────────────────── */}
      <div className="overflow-hidden bg-gray-100">
        <div className="flex h-52 md:h-64">
          {stripPhotos.map((photo, i) => (
            <div key={i} className="flex-shrink-0 w-48 md:w-64 h-full overflow-hidden">
              <img
                src={photo}
                alt={`H&H bathroom project ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
          {/* Duplicate for seamless feel on wide screens */}
          {stripPhotos.slice(0, 4).map((photo, i) => (
            <div key={`dup-${i}`} className="flex-shrink-0 w-48 md:w-64 h-full overflow-hidden">
              <img
                src={photo}
                alt={`H&H bathroom project extra ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ─────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
              Bathroom Remodeling Services
            </h2>
            <p className="text-gray-500 mt-4 text-base leading-relaxed">
              From a single fixture upgrade to a complete luxury transformation, we sweat every detail so you don't have to.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: serviceFullRemodel, title: "Full Bathroom Remodels", desc: "From demo day to the final reveal, we transform the entire room into a space that finally feels like yours." },
              { img: serviceShower, title: "Shower & Tub Replacement", desc: "Trade the cramped, dated enclosure for a walk-in shower or freestanding tub you look forward to every day." },
              { img: serviceTile, title: "Tile Installation", desc: "Porcelain, ceramic, or natural stone, set by hands that care about every line and every edge." },
              { img: serviceVanity, title: "Vanity & Fixture Upgrades", desc: "Statement vanities, smarter storage, and fixtures that make an everyday routine feel elevated." },
              { img: serviceAda, title: "ADA / Accessibility Remodels", desc: "Safe, graceful bathrooms built for comfort and independence, without giving up an ounce of style." },
              { img: serviceFlooring, title: "Flooring, Lighting & Trim", desc: "The quiet finishing details, flooring, lighting, trim, that make the whole room feel custom." },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={stagger(i)}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 aspect-[4/3]"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#203857]/90 via-[#203857]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg font-serif font-bold mb-1">{service.title}</h3>
                  <p className="text-sm text-white/80 leading-snug">{service.desc}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#consultation-form" className="inline-flex items-center gap-2 bg-secondary text-white font-semibold rounded-lg px-7 py-3.5 hover:bg-secondary/90 transition-colors shadow-md">
              Get Your Free Estimate
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section id="process" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
              Your Remodel, Step by Step
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-0 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-primary/20 z-0" />

            {[
              { n: "01", title: "Schedule", desc: "Call or submit the form. Tell us what you need." },
              { n: "02", title: "Consult", desc: "We review your space, style, and budget together." },
              { n: "03", title: "Plan", desc: "Get a clear scope, timeline, and no-surprise quote." },
              { n: "04", title: "Remodel", desc: "Our team builds with care, precision, and cleanliness." },
              { n: "05", title: "Love It", desc: "Step into a space that feels brand new, and finally, completely yours." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger(i)}
                className="relative z-10 flex flex-col items-center text-center px-4 py-2"
              >
                <div className="w-20 h-20 rounded-full bg-white border-2 border-primary shadow-md flex flex-col items-center justify-center mb-4">
                  <span className="text-xs font-bold text-primary tracking-widest">STEP</span>
                  <span className="text-xl font-serif font-bold text-secondary">{step.n}</span>
                </div>
                <h3 className="font-serif font-bold text-secondary text-lg mb-1.5">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="tel:5618884488" className="inline-flex items-center gap-2 bg-primary text-white font-bold rounded-lg px-7 py-3.5 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
              <Phone className="w-4 h-4" />
              Call to Start: (561) 888-4488
            </a>
          </div>
        </div>
      </section>

      {/* ── Why H&H ──────────────────────────────────────── */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #1f74bf 0%, transparent 60%)" }} />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why Choose H&amp;H</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Palm Beach Homeowners Trust Us For Quality Renovations
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Founded and led by <span className="text-white font-semibold">Tristan Dankert</span>, H&amp;H is a local Palm Beach crew that treats your home with the same respect and precision we'd give our own. Tristan stays hands-on from the first walkthrough to the final reveal, so every project gets real attention, honest communication, and zero shortcuts.
              </p>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-base flex-shrink-0">TD</div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Tristan Dankert</p>
                  <p className="text-white/50 text-xs">Owner &amp; the H&amp;H crew · Serving Palm Beach</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  "Local Palm Beach renovation experts, never a national chain",
                  "Licensed, insured, and fully experienced professionals",
                  "88+ Google Reviews with an excellent rating",
                  "Known for communication, cleanliness, and attention to detail",
                  "Custom solutions built around your home and lifestyle",
                  "End-to-end support from design through final walkthrough",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-white/85 font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Star, value: "88+", label: "Verified Reviews", sub: "Google & Houzz" },
                { icon: ShieldCheck, value: "100%", label: "Licensed & Insured", sub: "Florida Certified" },
                { icon: HomeIcon, value: "Local", label: "Palm Beach Team", sub: "Not a franchise" },
                { icon: BadgeCheck, value: "5★", label: "Average Rating", sub: "Across all platforms" },
              ].map(({ icon: Icon, value, label, sub }, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger(i)}
                  className="bg-white/8 border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-colors"
                >
                  <Icon className="w-7 h-7 text-primary mb-3" />
                  <div className="text-3xl font-serif font-bold text-white mb-1">{value}</div>
                  <div className="text-sm font-semibold text-white/90">{label}</div>
                  <div className="text-xs text-white/45 mt-0.5">{sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section id="reviews" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Real Reviews</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
              What Palm Beach Homeowners Are Saying
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "Extremely professional, takes great care and effort to make sure all the minute details are absolutely perfect. Was very prompt and clear with exactly what needed to be done for our bathroom and kitchen…", author: "Kevin Foster", initial: "KF" },
              { text: "Tristan and his team were amazing to work with. They renovated my house in Boca… the tile work everything was top notch. Tristan was very communicative and made the whole process stress-free.", author: "Andrew Pernal", initial: "AP" },
              { text: "Beautiful work! Very professional and they clean up after themselves! My new bathroom looks absolutely stunning. I couldn't be happier with the results.", author: "Kim Marie", initial: "KM" },
              { text: "Very professional, fair and very neat! Now I have a beautiful Kitchen & Bathroom for my family to enjoy! H&H delivered everything they promised and more.", author: "Anthony Wooster", initial: "AW" },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={stagger(i)}
                className="bg-gray-50 border border-gray-100 p-8 rounded-2xl relative"
              >
                <div className="absolute top-6 right-7 text-6xl font-serif text-primary/10 leading-none select-none">"</div>
                <div className="flex text-yellow-400 mb-5 gap-0.5">
                  {Array(5).fill(0).map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-[0.95rem] italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-bold text-secondary text-sm">{review.author}</p>
                    <p className="text-xs text-gray-400">Verified Google Review</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-full px-6 py-3">
              <div className="flex text-yellow-400">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm font-semibold text-gray-700">88+ five-star reviews on Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────── */}
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Our Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
              See The Craftsmanship For Yourself
            </h2>
            <p className="text-gray-500 mt-4">Real H&amp;H projects. Real Palm Beach homes.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger(i)}
                className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-zoom-in ${i === 0 ? "md:col-span-1 md:row-span-2 aspect-[3/4]" : "aspect-square"}`}
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img}
                  alt={galleryAlts[i]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: "center 40%" }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#consultation-form" className="inline-flex items-center gap-2 bg-primary text-white font-bold rounded-lg px-7 py-3.5 hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25">
              Love what you see? Start your project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Lead Capture Form ────────────────────────────── */}
      <section id="consultation-form" className="py-24 bg-secondary/5 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 bg-secondary p-8 lg:p-10 text-white flex flex-col justify-between">
                <div>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Free Consultation</p>
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-4 leading-tight">Get Your Free Bathroom Remodel Consultation</h3>
                  <p className="text-white/70 text-base leading-relaxed">
                    No pressure. No obligation. Just expert guidance from a local Palm Beach renovation team that delivers real results.
                  </p>
                </div>

                <div className="mt-10 space-y-6">
                  <div className="flex items-center gap-4 bg-white/8 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-0.5">Call Us Directly</p>
                      <a href="tel:5618884488" className="text-lg font-bold hover:text-primary transition-colors">(561) 888-4488</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/8 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-0.5">Service Area</p>
                      <p className="font-bold">Palm Beach &amp; South Florida</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Licensed", "Insured", "Local", "5-Star Rated"].map(tag => (
                      <span key={tag} className="bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 p-8 lg:p-10">
                <YouformEmbed formId="mqxfscuq" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
              Common Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {[
              { q: "How much does a bathroom remodel cost?", a: "Every bathroom is different. Cost depends on size, materials, layout changes, tile work, fixtures, and scope of work. The best next step is a no-obligation consultation." },
              { q: "Do you handle full bathroom remodels?", a: "Yes. H&H Signature Renovations offers full remodels as well as tile, flooring, plumbing fixtures, electrical fixtures, painting, drywall, trim, and more." },
              { q: "Are you licensed and insured?", a: "Yes. Our team is composed of licensed, insured, and experienced professionals operating in Palm Beach County and South Florida." },
              { q: "What areas do you serve?", a: "We serve the Palm Beaches and surrounding areas throughout South Florida, including Boca Raton, Delray Beach, West Palm Beach, and nearby communities." },
              { q: "Can you help me choose the design?", a: "Absolutely. We emphasize tailored solutions and take time to understand each homeowner's style, preferences, and lifestyle goals before recommending finishes." },
              { q: "How do I get started?", a: "Call (561) 888-4488 or fill out the consultation form above and we'll be in touch promptly to discuss your project." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-gray-50 border border-gray-100 rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:bg-blue-50/30 transition-colors">
                <AccordionTrigger className="text-base font-bold text-secondary hover:text-primary transition-colors text-left py-5 hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm pb-5 leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Service Cities ───────────────────────────────── */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Where We Work</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Proudly Serving Palm Beach County &amp; South Florida
            </h2>
            <p className="text-white/60 mt-3 text-sm max-w-xl mx-auto">
              H&amp;H Signature Renovations serves homeowners across the Palm Beach area. Don't see your city? Call us, we likely serve it.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              "West Palm Beach", "Boca Raton", "Delray Beach", "Boynton Beach",
              "Palm Beach Gardens", "Jupiter", "Wellington", "Lake Worth",
              "Palm Beach", "Riviera Beach", "Greenacres", "Royal Palm Beach",
              "Coral Springs", "Deerfield Beach", "Lantana", "Tequesta",
            ].map(city => (
              <div key={city} className="flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/10 rounded-lg px-4 py-3 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-white/85">{city}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="tel:5618884488" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-sm transition-colors">
              <Phone className="w-4 h-4" />
              Not sure we cover your area? Call (561) 888-4488
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={finalCtaBg} alt="Luxury bathroom remodel by H&H Signature Renovations" className="w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
          <div className="absolute inset-0 bg-secondary/88" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Ready to Start?</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Let's Build the Bathroom<br />You Actually Want to Wake Up To
          </h2>
          <p className="text-white/70 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Warm light. Tile you'll run your hand across just because. Finishes that still feel right years from now. Tell us what you're picturing and we'll make it real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5618884488" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg px-8 py-4 text-lg transition-all shadow-xl shadow-primary/30" data-testid="button-call-footer">
              <Phone className="w-5 h-5" />
              Call Now: (561) 888-4488
            </a>
            <a href="#consultation-form" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg px-8 py-4 text-lg border border-white/25 backdrop-blur-sm transition-all" data-testid="button-form-scroll-footer">
              Request Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="bg-[#111827] text-white/60 py-12 pb-28 md:pb-12">
        <div className="container mx-auto px-4 text-center">
          <img src={logoPath} alt="H&H Signature Renovations" className="h-14 w-auto mx-auto mb-5 brightness-0 invert opacity-80" />
          <h3 className="text-lg font-serif font-bold text-white mb-1">H&amp;H Signature Renovations</h3>
          <p className="text-sm mb-6">Where your home's potential comes to life.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8 text-sm">
            <a href="tel:5618884488" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> (561) 888-4488
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Serving Palm Beach &amp; South Florida
            </span>
          </div>
          <div className="border-t border-white/8 pt-6 text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} H&amp;H Signature Renovations. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── Mobile Sticky CTA ────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] p-3">
        <div className="relative">
          <span className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-20 pointer-events-none" />
          <a
            href="tel:5618884488"
            className="relative flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl py-4 text-base transition-all"
            data-testid="button-call-sticky-mobile"
          >
            <Phone className="w-5 h-5" />
            Call Now: (561) 888-4488
          </a>
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-3 md:left-6 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              src={galleryImages[lightboxIndex]}
              alt={galleryAlts[lightboxIndex]}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-3 md:right-6 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs text-center max-w-xs">
              {galleryAlts[lightboxIndex]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
