"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, TrendingUp, Target } from "lucide-react";

const goals = [
  {
    icon: "💍",
    name: "Marriage Fund",
    people: "3,240",
    range: "৳5,000 – ৳30,000/mo",
    months: "12–36 months",
    fill: 65,
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: "🕌",
    name: "Hajj Fund",
    people: "1,890",
    range: "৳10,000 – ৳20,000/mo",
    months: "24–48 months",
    fill: 45,
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: "🛡️",
    name: "Emergency fund",
    people: "5,610",
    range: "৳500 – ৳5,000/mo",
    months: "6–12 months",
    fill: 75,
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "🎓",
    name: "Education Fund",
    people: "2,140",
    range: "৳2,000 – ৳15,000/mo",
    months: "12–60 months",
    fill: 55,
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: "💻",
    name: "Gadgets/Devices",
    people: "4,320",
    range: "৳1,000 – ৳10,000/mo",
    months: "3–12 months",
    fill: 80,
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: "💼",
    name: "Starting a business",
    people: "980",
    range: "৳5,000 – ৳50,000/mo",
    months: "12–48 months",
    fill: 35,
    color: "from-slate-500 to-gray-500",
  },
];

const GoalCard = ({
  icon,
  name,
  people,
  range,
  months,
  fill,
  color,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="
        bg-card border border-border rounded-2xl p-5 sm:p-6 lg:p-7
        flex flex-col items-center text-center
        hover:border-primary/40
        transition-all duration-300
        cursor-pointer relative overflow-hidden group
      "
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon with Animation */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-4xl sm:text-5xl mb-4 select-none relative z-10"
      >
        {icon}
      </motion.div>

      {/* Name */}
      <h3 className="text-foreground font-bold text-base sm:text-lg mb-4 relative z-10">
        {name}
      </h3>

      {/* People saving */}
      <div className="flex items-center gap-1.5 mb-3 self-start w-full relative z-10">
        <Users size={14} className="text-primary" />
        <span className="text-foreground/60 text-xs sm:text-sm">
          {people} people are saving
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-background rounded-full h-2 mb-4 overflow-hidden relative z-10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${fill}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`h-full rounded-full bg-linear-to-r ${color} relative`}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shine" />
        </motion.div>
      </div>

      {/* Range & months */}
      <div className="flex items-center justify-between w-full mb-6 relative z-10">
        <div className="flex items-center gap-1">
          <TrendingUp size={12} className="text-primary" />
          <span className="text-primary font-semibold text-xs sm:text-sm">
            {range}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-foreground/50" />
          <span className="text-foreground/50 text-xs sm:text-sm">
            {months}
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="
          w-full py-2.5 sm:py-3 rounded-xl border border-primary
          text-primary text-sm font-semibold
          hover:bg-primary hover:text-white
          transition-all duration-300
          relative z-10
        "
      >
        Join the circle →
      </motion.button>
    </motion.div>
  );
};

const HomeGoal = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="bg-background min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          {/* Badge */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              viewport={{ once: true }}
              className="
                inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-primary/10 dark:bg-primary/20
                text-primary text-xs sm:text-sm font-semibold
                border border-primary/20
              "
            >
              <Target size={14} />
              Savings goal
            </motion.div>
          </div>

          {/* Headline */}
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-4">
            <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Save for
            </span>
            <span> what really matters.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-center text-foreground/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Choose from our community&apos;s popular savings goals, or create
            your own custom goal. Join thousands of members already saving
            together.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-12"
        >
          {goals.map((goal, index) => (
            <GoalCard key={goal.name} {...goal} index={index} />
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="
              px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl
              border border-border
              text-foreground text-sm font-semibold
              hover:border-primary hover:text-primary
              transition-all duration-300
              flex items-center gap-2 group
            "
          >
            View all goals and circles
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                value: "18,000+",
                label: "Active Savers",
                icon: <Users size={20} />,
              },
              {
                value: "৳500Cr+",
                label: "Total Saved",
                icon: <TrendingUp size={20} />,
              },
              {
                value: "45,000+",
                label: "Goals Completed",
                icon: <Target size={20} />,
              },
              {
                value: "98.5%",
                label: "Success Rate",
                icon: <Calendar size={20} />,
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-primary mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add custom keyframe animation for shine effect */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default HomeGoal;
