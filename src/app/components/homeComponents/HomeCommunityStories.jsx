"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const testimonials = [
  {
    text: "I saved ৳2.4 lakh for my wedding in just 18 months! The savings circle kept me disciplined when I wanted to spend the money. Amanah changed my life.",
    name: "Rahima Begum",
    role: "Homemaker, Dhaka · Wedding Fund",
    initial: "R",
    avatar: "linear-gradient(135deg,#059669,#0891b2)",
  },
  {
    text: "As a student, I saved ৳50,000 for my laptop using the Bronze plan. The AI assistant told me exactly how much to save each week. Incredible platform!",
    name: "Karim Ahmed",
    role: "University Student, Chittagong · Gadget Fund",
    initial: "K",
    avatar: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  },
  {
    text: "Our family joined a Hajj savings circle and we're on track for 2027. The Islamic savings mode gives us peace of mind that everything is halal.",
    name: "Nasrin & Husband",
    role: "Family, Sylhet · Hajj Fund Active",
    initial: "N",
    avatar: "linear-gradient(135deg,#059669,#0891b2)",
  },
];

const HomeCommunityStories = () => {
  return (
    <section className="bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)] dark:text-[#f1f5f9] md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
          Community Stories
        </span>

        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
          What Our <span className="text-[#059669]">Members Say</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 text-left shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-[#1e2d3d] dark:bg-[#1a2235]"
    >
      <div className="mb-3 text-sm text-[#f59e0b]">★★★★★</div>

      <p className="mb-4 text-sm italic leading-[1.7] text-[#475569] dark:text-[#94a3b8]">
        &quot;{testimonial.text}&quot;
      </p>

      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
          style={{ background: testimonial.avatar }}
        >
          {testimonial.initial}
        </div>
        <div>
          <div className="text-sm font-bold text-[#0f172a] dark:text-[#f1f5f9]">
            {testimonial.name}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
            <span>{testimonial.role}</span>
            <CheckCircle size={12} className="shrink-0 text-[#059669]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeCommunityStories;
