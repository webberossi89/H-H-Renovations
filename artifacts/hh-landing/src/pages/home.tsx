import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Star, CheckCircle, ShieldCheck, MapPin, Phone, Users, Clock, ArrowRight, ChevronDown } from "lucide-react";
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

import heroBg from "@assets/image_1779995714268.png";
import serviceFullRemodel from "@assets/hh_project_photos/photo_46.jpg";
import serviceShower from "@assets/hh_project_photos/photo_36.jpg";
import serviceTile from "@assets/hh_project_photos/photo_13.jpg";
import serviceVanity from "@assets/hh_project_photos/photo_65.jpg";
import serviceAda from "@assets/hh_project_photos/photo_04.jpg";
import serviceFlooring from "@assets/hh_project_photos/photo_12.jpg";
import gallery1 from "@assets/hh_project_photos/photo_32.jpg";
import gallery2 from "@assets/hh_project_photos/photo_37.jpg";
import gallery3 from "@assets/hh_project_photos/photo_14.jpg";
import gallery4 from "@assets/hh_project_photos/photo_31.jpg";
import gallery5 from "@assets/hh_project_photos/photo_40.jpg";
import gallery6 from "@assets/hh_project_photos/photo_35.jpg";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().optional(),
  services: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one item.",
  }),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
});

export default function Home() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      services: [],
      budget: "",
      timeline: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
    toast({
      title: "Consultation Requested!",
      description: "We will be in touch with you shortly.",
    });
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* 1. Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={logoPath} alt="H&H Signature Renovations" className="h-12 w-auto object-contain" />
          </a>
          <Button asChild size="lg" className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm" data-testid="button-call-header">
            <a href="tel:5618884488">
              <Phone className="w-5 h-5 mr-2" />
              Call (561) 888-4488
            </a>
          </Button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Beautiful bathroom remodel" className="w-full h-full object-cover" style={{ objectPosition: 'center 55%' }} />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <div className="inline-block px-3 py-1 mb-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium tracking-wide uppercase">
              Serving Palm Beach & South Florida Homeowners
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Palm Beach Bathroom Remodeling Built With Detail, Style & Care
            </h1>
            <p className="text-xl text-gray-200 mb-4 font-medium">
              Turn your outdated bathroom into a clean, modern, luxury space — without the stress of chasing contractors.
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              H&H Signature Renovations delivers high-quality bathroom remodels with skilled craftsmanship, clear communication, and a professional team you can trust.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="xl" className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8" data-testid="button-call-hero">
                <a href="tel:5618884488">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: (561) 888-4488
                </a>
              </Button>
              <Button asChild size="xl" variant="outline" className="bg-white text-foreground hover:bg-gray-100 text-lg h-14 px-8" data-testid="button-form-scroll-hero">
                <a href="#consultation-form">
                  Get Your Free Consultation
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-300 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-400"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                Excellent Google Reviews
              </div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-secondary"/> Licensed & Insured</div>
              <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-secondary"/> Local Palm Beach Experts</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-secondary"/> Clean, Professional Work</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Pain Points Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Is Your Bathroom Outdated, Cramped, Or Just Not Working For You?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Old tile. Poor layout. Not enough storage. A shower you hate using every day. Your bathroom should feel clean, comfortable, and built around your lifestyle — not like a project you keep putting off.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
              {[
                "More modern",
                "Easier to clean",
                "Better organized",
                "More comfortable",
                "Better finishes",
                "Built with long-lasting craftsmanship"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-border/50">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Bathroom Remodeling Services We Offer
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: serviceFullRemodel, title: "Full Bathroom Remodels", desc: "Complete transformations from demo to final finishes, tailored to your exact style." },
              { img: serviceShower, title: "Shower & Tub Replacement", desc: "Upgrade to a luxurious walk-in shower or freestanding tub with premium fixtures." },
              { img: serviceTile, title: "Tile Installation", desc: "Precision tile work for floors, walls, and showers using porcelain, ceramic, or natural stone." },
              { img: serviceVanity, title: "Vanity & Fixture Upgrades", desc: "Modern vanities, enhanced storage, and stylish plumbing and lighting fixtures." },
              { img: serviceAda, title: "ADA / Accessibility Remodels", desc: "Beautiful, functional bathrooms designed for safety, comfort, and aging in place." },
              { img: serviceFlooring, title: "Flooring, Lighting & Trim", desc: "The finishing touches that pull the whole room together with elegance." }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
                className="group rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-serif font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lead Capture Form Section */}
      <section id="consultation-form" className="py-20 bg-secondary/5 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
            <div className="grid md:grid-cols-5 h-full">
              <div className="md:col-span-2 bg-secondary p-8 lg:p-10 text-white flex flex-col justify-center">
                <h3 className="text-3xl font-serif font-bold mb-4">Get Your Free Bathroom Remodel Consultation</h3>
                <p className="text-secondary-foreground/90 mb-8 text-lg">
                  No pressure. No obligation. Just expert guidance from a local Palm Beach renovation team.
                </p>
                
                <div className="space-y-6 mt-auto">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-secondary-foreground/70 font-medium uppercase tracking-wider mb-1">Call Us Directly</p>
                      <a href="tel:5618884488" className="text-xl font-bold hover:text-white transition-colors">
                        (561) 888-4488
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-secondary-foreground/70 font-medium uppercase tracking-wider mb-1">Service Area</p>
                      <p className="text-lg font-medium">Palm Beach & South Florida</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 p-8 lg:p-10">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12" data-testid="form-success-message">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground text-lg mb-6">Your consultation request has been received. We will be in touch shortly.</p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">Submit Another Request</Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone *</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Address</FormLabel>
                              <FormControl>
                                <Input placeholder="City or Zip Code" {...field} data-testid="input-address" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="services"
                        render={() => (
                          <FormItem>
                            <div className="mb-3">
                              <FormLabel className="text-base">What are you looking to remodel? *</FormLabel>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {["Shower", "Tub", "Vanity", "Tile", "Full bathroom", "Not sure yet"].map((item) => (
                                <FormField
                                  key={item}
                                  control={form.control}
                                  name="services"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item}
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, item])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item
                                                    )
                                                  )
                                            }}
                                            data-testid={`checkbox-service-${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal text-sm cursor-pointer">
                                          {item}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Approximate budget</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-budget">
                                    <SelectValue placeholder="Select budget" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="under-10k">Under $10k</SelectItem>
                                  <SelectItem value="10k-25k">$10k–$25k</SelectItem>
                                  <SelectItem value="25k-50k">$25k–$50k</SelectItem>
                                  <SelectItem value="50k-plus">$50k+</SelectItem>
                                  <SelectItem value="not-sure">Not sure</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Desired timeline</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-timeline">
                                    <SelectValue placeholder="Select timeline" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="asap">ASAP</SelectItem>
                                  <SelectItem value="1-3-months">1–3 months</SelectItem>
                                  <SelectItem value="3-6-months">3–6 months</SelectItem>
                                  <SelectItem value="just-planning">Just planning</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us a bit about your vision..." 
                                className="resize-none" 
                                {...field} 
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-12" data-testid="button-submit-form">
                        Get My Free Consultation
                      </Button>
                      <p className="text-center text-sm text-muted-foreground mt-4">
                        No pressure. No obligation. Just expert guidance from a local renovation team.
                      </p>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Our Simple Bathroom Remodeling Process
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
            
            {[
              { title: "Schedule Your Consultation", desc: "Call or submit the form and tell us what you want to change." },
              { title: "Review Your Space & Goals", desc: "We'll talk through your style, layout, priorities, timeline, and budget." },
              { title: "Get A Clear Plan", desc: "You'll know what's being done, what to expect, and how the project will move forward." },
              { title: "We Remodel With Care", desc: "Our team handles the details with professionalism, cleanliness, and craftsmanship." },
              { title: "Enjoy Your New Bathroom", desc: "Step into a bathroom that looks better, works better, and adds value to your home." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
                className={`relative flex md:justify-between items-center mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block w-5/12"></div>
                
                <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center z-10 md:-translate-x-1/2 border-4 border-white shadow-sm">
                  {i + 1}
                </div>
                
                <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-muted/30 p-6 rounded-xl border border-border">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Choose H&H Section */}
      <section className="py-20 bg-foreground text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Palm Beach Homeowners Trust H&H For Quality Renovations
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MapPin, text: "Local Palm Beach renovation experts" },
              { icon: ShieldCheck, text: "Licensed, insured, and experienced professionals" },
              { icon: Star, text: "88+ Google Reviews — Excellent rating" },
              { icon: Phone, text: "Known for communication and attention to detail" },
              { icon: CheckCircle, text: "Professional, clean, respectful work" },
              { icon: Users, text: "Custom solutions for your home and style" },
              { icon: Clock, text: "End-to-end support from planning to final touches" }
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <point.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <p className="text-lg font-medium">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              What Local Homeowners Are Saying
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "Extremely professional, takes great care and effort to make sure all the minute details are absolutely perfect. Was very prompt and clear with exactly what needed to be done for our bathroom and kitchen…", author: "Kevin Foster" },
              { text: "Tristan and his team were amazing to work with. They renovated my house in Boca… the tile work everything was top notch. Tristan was very communicative…", author: "Andrew Pernal" },
              { text: "Beautiful work! Very professional and they clean up after themselves!", author: "Kim Marie" },
              { text: "Very professional, fair and very neat! Now I have a beautiful Kitchen & Bathroom for my family to enjoy!", author: "Anthony Wooster" }
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-border">
                <div className="flex text-yellow-400 mb-4">
                  <Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/>
                </div>
                <p className="text-lg text-foreground italic mb-6">"{review.text}"</p>
                <p className="font-bold text-muted-foreground">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              See The Craftsmanship For Yourself
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg">
                <img src={img} alt={`Gallery image ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Common Questions About Bathroom Remodeling
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border border-border">
            {[
              { q: "How much does a bathroom remodel cost?", a: "Every bathroom is different. Cost depends on size, materials, layout changes, tile work, fixtures, and scope of work. The best next step is a consultation." },
              { q: "Do you handle full bathroom remodels?", a: "Yes. H&H Signature Renovations offers full remodels as well as tile, flooring, plumbing fixtures, electrical fixtures, painting, drywall, trim, and more." },
              { q: "Are you licensed and insured?", a: "Yes. Our team is composed of licensed, insured, and experienced professionals." },
              { q: "Do you serve my area?", a: "We serve the Palm Beaches and surrounding areas throughout South Florida." },
              { q: "Can you help me choose the design?", a: "Yes. We emphasize tailored solutions and customizing projects to fit the homeowner's needs and style." },
              { q: "How do I get started?", a: "Call (561) 888-4488 or fill out the consultation form to discuss your project." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0 px-6">
                <AccordionTrigger className="text-lg font-bold hover:text-primary transition-colors text-left py-6">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 11. Final CTA Section */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Let's Build The Bathroom You've Been Wanting
          </h2>
          <p className="text-xl text-secondary-foreground/90 mb-10 max-w-2xl mx-auto">
            Modern shower. Better tile. Cleaner finishes. More comfort every day. Work with a local Palm Beach renovation team known for craftsmanship, communication, and attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8" data-testid="button-call-footer">
              <a href="tel:5618884488">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (561) 888-4488
              </a>
            </Button>
            <Button asChild size="xl" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary text-lg h-14 px-8" data-testid="button-form-scroll-footer">
              <a href="#consultation-form">
                Request Your Free Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-foreground text-white/70 py-12 border-t border-white/10 pb-28 md:pb-12">
        <div className="container mx-auto px-4 text-center">
          <img src={logoPath} alt="H&H Signature Renovations" className="h-16 w-auto mx-auto mb-6 opacity-90 brightness-0 invert" />
          <h3 className="text-xl font-serif font-bold text-white mb-2">H&H Signature Renovations</h3>
          <p className="mb-4">Where your home's potential comes to life.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8 text-sm">
            <a href="tel:5618884488" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> (561) 888-4488
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Serving Palm Beach & South Florida
            </span>
          </div>
          <div className="border-t border-white/10 pt-8 text-sm">
            <p>&copy; {new Date().getFullYear()} H&H Signature Renovations. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Call Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg" data-testid="button-call-sticky-mobile">
          <a href="tel:5618884488">
            <Phone className="w-5 h-5 mr-2" />
            Call Now: (561) 888-4488
          </a>
        </Button>
      </div>
    </div>
  );
}