"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Users, Target, Heart, Shield } from "lucide-react";

const HomeCommunityStories = () => {
  const testimonials = [
    {
      name: "Rahima Begum",
      role: "Housewife, Dhaka",
      achievement: "Marriage Fund ✓",
      amount: "৳2.4 lakh",
      time: "18 months",
      quote:
        "I saved ৳2.4 lakh for my wedding in just 18 months! Savings Circle has kept me disciplined even when I want to spend. Amanah has changed my life.",
      initial: "R",
      color: "from-emerald-500 to-emerald-600",
      rating: 5,
      delay: 0,
    },
    {
      name: "Karim Ahmed",
      role: "University Student, Chittagong",
      achievement: "Gadget Fund ✓",
      amount: "৳50,000",
      goal: "laptop",
      quote:
        "As a student, I saved ৳50,000 for a laptop using the Bronze plan. The AI assistant told me exactly how much to save each week. Great platform!",
      initial: "K",
      color: "from-violet-500 to-violet-600",
      rating: 5,
      delay: 0.1,
    },
    {
      name: "Nasreen and her husband",
      role: "Family, Sylhet",
      achievement: "Hajj Fund Active",
      quote:
        "Our family has joined the Hajj Savings Circle and we are on track to meet our 2027 goal. The Islamic savings mode gives us peace of mind that everything is halal.",
      initial: "N",
      color: "from-teal-500 to-teal-600",
      rating: 5,
      delay: 0.2,
    },
  ];

  const stats = [
    { value: "15,000+", label: "Happy Members", icon: <Users size={18} /> },
    { value: "98%", label: "Goal Completion", icon: <Target size={18} /> },
    { value: "4.9", label: "Average Rating", icon: <Star size={18} /> },
    { value: "৳500Cr+", label: "Total Saved", icon: <Heart size={18} /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen bg-background py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-md px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-primary/20 mb-5 sm:mb-6"
          >
            <Quote size={14} className="text-primary" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-primary">
              Community stories
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            What our{" "}
            <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
              members say
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/70 max-w-2xl">
            Real stories from real people who achieved their savings goals with
            Amanah
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              className="group bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote icon background */}
              <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote size={60} />
              </div>

              {/* Rating Stars */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: testimonial.delay }}
                className="flex gap-1 mb-5 sm:mb-6"
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: testimonial.delay + i * 0.05 }}
                    className="text-yellow-400 text-base sm:text-lg"
                  >
                    ★
                  </motion.span>
                ))}
              </motion.div>

              {/* Quote Text */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: testimonial.delay + 0.1 }}
                className="text-foreground/80 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8 relative z-10"
              >
                &quot;{testimonial.quote}&quot;
              </motion.p>

              {/* User Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: testimonial.delay + 0.2 }}
                className="flex items-center gap-3 sm:gap-4 relative z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-r ${testimonial.color} rounded-full flex items-center justify-center text-white text-base sm:text-xl font-semibold shadow-lg`}
                >
                  {testimonial.initial}
                </motion.div>
                <div>
                  <div className="font-semibold text-foreground text-sm sm:text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-xs sm:text-sm text-foreground/60">
                    {testimonial.role}
                  </div>
                  {testimonial.achievement && (
                    <div className="text-xs text-primary mt-0.5 flex items-center gap-1">
                      <span className="text-primary">✓</span>
                      {testimonial.achievement}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Achievement Badge */}
              {testimonial.amount && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: testimonial.delay + 0.3 }}
                  className="absolute bottom-6 right-6 bg-primary/20 rounded-full px-2 py-1 text-xs font-semibold text-primary"
                >
                  {testimonial.amount} saved
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="text-primary mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <motion.h3
                  className="text-xl sm:text-2xl font-bold text-foreground mb-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-xs sm:text-sm text-foreground/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group cursor-pointer inline-flex items-center gap-2 bg-linear-to-r from-primary to-primary-light text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
          >
            <Heart size={18} />
            Share Your Story
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCommunityStories;
