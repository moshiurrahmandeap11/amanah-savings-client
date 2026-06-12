"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronDown, Check, X
} from "lucide-react";

const PlanPage = () => {
  const [billingMode, setBillingMode] = useState("monthly");
  const [deposit, setDeposit] = useState(3000);
  const [duration, setDuration] = useState(12);
  const [target, setTarget] = useState("");
  const [plan, setPlan] = useState("gold");
  const [openFaq, setOpenFaq] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const plans = {
    bronze: { name: "Bronze", tier: "Starter", monthly: 0, yearly: 0, minDeposit: 500, color: "from-amber-600 to-amber-700", icon: "🥉", popular: false },
    silver: { name: "Silver", tier: "Essential", monthly: 199, yearly: 159, minDeposit: 1000, color: "from-gray-400 to-gray-500", icon: "🥈", popular: false },
    gold: { name: "Gold", tier: "Growth", monthly: 499, yearly: 399, minDeposit: 2000, color: "from-amber-500 to-yellow-500", icon: "🥇", popular: true },
    platinum: { name: "Platinum", tier: "Elite", monthly: 999, yearly: 799, minDeposit: 5000, color: "from-purple-500 to-indigo-500", icon: "💎", popular: false }
  };

  const planFeatures = {
    bronze: [
      { text: "Up to 3 savings goals", included: true },
      { text: "Min deposit: ৳500/month", included: true },
      { text: "bKash & Nagad payments", included: true },
      { text: "Basic progress tracking", included: true },
      { text: "Community access (read)", included: true },
      { text: "Savings circles", included: false },
      { text: "AI savings insights", included: false },
      { text: "Priority withdrawals", included: false }
    ],
    silver: [
      { text: "Up to 6 savings goals", included: true },
      { text: "Min deposit: ৳1,000/month", included: true },
      { text: "All payment methods", included: true },
      { text: "Join 1 savings circle", included: true },
      { text: "Streak tracking + badges", included: true },
      { text: "Monthly insights report", included: true },
      { text: "AI financial assistant", included: false },
      { text: "Priority withdrawals", included: false }
    ],
    gold: [
      { text: "Unlimited savings goals", included: true },
      { text: "Min deposit: ৳2,000/month", included: true },
      { text: "All payment methods", included: true },
      { text: "Join up to 3 circles", included: true },
      { text: "AI savings assistant", included: true },
      { text: "Weekly insights report", included: true },
      { text: "Leaderboard participation", included: true },
      { text: "Priority withdrawal (3 days)", included: true }
    ],
    platinum: [
      { text: "Unlimited savings goals", included: true },
      { text: "Min deposit: ৳5,000/month", included: true },
      { text: "All payment methods + bank", included: true },
      { text: "Create + join 10 circles", included: true },
      { text: "Advanced AI assistant", included: true },
      { text: "Daily personalized report", included: true },
      { text: "Priority withdrawal (24h)", included: true },
      { text: "Dedicated account manager", included: true }
    ]
  };

  const faqs = [
    { q: "Can I change my plan later?", a: "Yes! You can upgrade your plan at any time from your dashboard settings. Downgrading is also possible at the end of your current billing cycle." },
    { q: "Is there a free trial for paid plans?", a: "Silver and Gold plans include a 30-day free trial with full features. Platinum offers a 14-day trial with a dedicated account manager." },
    { q: "What happens if I miss a monthly deposit?", a: "Missing a deposit breaks your savings streak but does not cancel your plan. Your goal timeline adjusts automatically. There are no late fees." },
    { q: "How is this different from a bank savings account?", a: "Amanah is a digital savings community, not a bank. We don't hold your money in the traditional banking sense — we are a goal-tracking and community savings platform." },
    { q: "Can I withdraw before my goal date?", a: "Yes, but early withdrawals may incur a small processing fee (3–5%). Gold members can make early withdrawals for a fee. Platinum members get one free early withdrawal per year." },
    { q: "Is Islamic Mode available on all plans?", a: "Yes, Islamic savings mode (riba-free) is available on every plan including Bronze. Toggle it on during registration or in your profile." }
  ];



  const getPrice = (planKey) => {
    return billingMode === "monthly" ? plans[planKey].monthly : plans[planKey].yearly;
  };

  const totalSaved = deposit * duration;
  const targetNum = parseInt(target) || 0;
  const monthsNeeded = targetNum > 0 ? Math.ceil(targetNum / deposit) : 0;
  const shortfall = targetNum > 0 && totalSaved < targetNum ? targetNum - totalSaved : 0;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-primary to-primary-light py-16 sm:py-20 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm mb-6">
            💎 Transparent Savings Plans
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Pick Your Savings Journey
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            From your first ৳500 deposit to building a ৳10 lakh emergency fund — 
            we have a plan that grows with your ambitions.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <div className="text-3xl font-bold text-white">৳500</div>
              <div className="text-white/80 text-sm">Minimum to start</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4 Tiers</div>
              <div className="text-white/80 text-sm">Plans available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">0%</div>
              <div className="text-white/80 text-sm">Hidden fees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">Free</div>
              <div className="text-white/80 text-sm">Upgrade anytime</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" fill="var(--background)" />
          </svg>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-primary text-sm font-semibold mb-2">Savings Plans</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Choose Your Tier</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              No investment products, no guaranteed returns — just a powerful community savings platform built for your goals.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-10">
            <div className="flex bg-card border border-border rounded-xl p-1">
              <button 
                onClick={() => setBillingMode("monthly")} 
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${billingMode === "monthly" ? "bg-linear-to-r from-primary to-primary-light text-white" : "text-foreground/70 hover:text-primary"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingMode("yearly")} 
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${billingMode === "yearly" ? "bg-linear-to-r from-primary to-primary-light text-white" : "text-foreground/70 hover:text-primary"}`}
              >
                Yearly <span className="text-primary text-xs ml-1">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(plans).map(([key, p]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`relative bg-card border rounded-2xl p-6 transition-all ${p.popular ? "border-primary shadow-lg shadow-primary/20" : "border-border hover:border-primary/40"}`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-primary to-primary-light text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    ⭐ Most Popular
                  </div>
                )}
                <div className={`w-14 h-14 rounded-xl bg-linear-to-r ${p.color} flex items-center justify-center text-2xl mb-4`}>
                  {p.icon}
                </div>
                <div className="text-xs font-bold text-primary mb-1">{p.name}</div>
                <div className="text-xl font-bold text-foreground mb-1">{p.tier}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-foreground">৳{getPrice(key).toLocaleString()}</span>
                  <span className="text-foreground/50 text-sm">/month</span>
                </div>
                <p className="text-foreground/60 text-sm mb-4">
                  {key === "gold" && "Our flagship plan with AI assistant, unlimited goals, and full circle access."}
                  {key === "platinum" && "For power savers who want exclusive features, dedicated support & elite status."}
                  {key === "silver" && "For regular savers building serious momentum with community features."}
                  {key === "bronze" && "Perfect for beginners. Save at your own pace with no platform fee, forever."}
                </p>
                
                {/* Features List */}
                <div className="mt-4 mb-6">
                  {planFeatures[key].slice(0, 5).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-1.5">
                      {feature.included ? (
                        <Check size={14} className="text-primary shrink-0" />
                      ) : (
                        <X size={14} className="text-red-400 shrink-0" />
                      )}
                      <span className={`text-xs text-foreground/70 ${!feature.included && "line-through opacity-50"}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/register" 
                  className={`block w-full py-3 rounded-xl text-center font-semibold text-sm transition ${p.popular ? "bg-linear-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20" : "border border-border text-foreground hover:border-primary hover:text-primary"}`}
                >
                  Choose {p.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Islamic Mode Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-linear-to-r from-emerald-900/30 to-teal-900/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 border border-primary/20"
          >
            <div className="text-5xl">☪️</div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-lg mb-1">Islamic Savings Mode Available on All Plans</h3>
              <p className="text-foreground/70 text-sm">Enable riba-free savings across all tiers. Fully compliant with Halal finance principles.</p>
            </div>
            <Link href="/register" className="px-6 py-2 bg-white text-primary rounded-xl font-semibold text-sm hover:bg-primary/10 transition whitespace-nowrap">
              Enable Islamic Mode
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-primary text-sm font-semibold mb-2">Savings Calculator</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">See Your Goal Timeline</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">Adjust the sliders and watch your savings projection update instantly.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">Configure Your Plan</h3>
              <p className="text-foreground/60 text-sm mb-6">Estimate how fast you&apos;ll reach your goal with consistent monthly saving.</p>

              <div className="space-y-5">
                <div>
                  <label className="flex justify-between text-sm font-medium text-foreground/80 mb-2">
                    <span>Savings Plan</span>
                    <span className="text-primary">{plans[plan].name}</span>
                  </label>
                  <select 
                    value={plan} 
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary transition"
                  >
                    <option value="bronze">Bronze — Free (৳500 min/mo)</option>
                    <option value="silver">Silver — ৳199/mo (৳1,000 min/mo)</option>
                    <option value="gold" selected>Gold — ৳499/mo (৳2,000 min/mo)</option>
                    <option value="platinum">Platinum — ৳999/mo (৳5,000 min/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="flex justify-between text-sm font-medium text-foreground/80 mb-2">
                    <span>Monthly Deposit</span>
                    <span className="text-primary">৳{deposit.toLocaleString()}</span>
                  </label>
                  <input 
                    type="range" 
                    min={plans[plan].minDeposit} 
                    max="50000" 
                    step="500" 
                    value={deposit} 
                    onChange={(e) => setDeposit(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm font-medium text-foreground/80 mb-2">
                    <span>Goal Duration</span>
                    <span className="text-primary">{duration} months</span>
                  </label>
                  <input 
                    type="range" 
                    min="3" 
                    max="60" 
                    step="1" 
                    value={duration} 
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-2 block">
                    Goal Target (optional)
                  </label>
                  <input 
                    type="number" 
                    placeholder="e.g. 100000" 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>
            </div>

            {/* Calculator Result */}
            <div className="bg-linear-to-r from-primary to-primary-light rounded-2xl p-6 text-white">
              <h4 className="text-sm opacity-90 mb-2">You will save</h4>
              <div className="text-4xl font-bold mb-6">৳{totalSaved.toLocaleString()}</div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <div className="text-xs opacity-80">Monthly</div>
                  <div className="text-lg font-bold">৳{deposit.toLocaleString()}</div>
                </div>
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <div className="text-xs opacity-80">Duration</div>
                  <div className="text-lg font-bold">{duration} mo</div>
                </div>
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <div className="text-xs opacity-80">Goal reached</div>
                  <div className="text-lg font-bold">
                    {targetNum > 0 ? (totalSaved >= targetNum ? monthsNeeded + " mo" : (duration + Math.ceil(shortfall / deposit)) + " mo") : "—"}
                  </div>
                </div>
              </div>

              {targetNum > 0 && (
                <div className="text-sm opacity-90 mb-6">
                  {totalSaved >= targetNum ? (
                    <span> You&apos;ll reach your ৳{targetNum.toLocaleString()} goal in <strong>{monthsNeeded} months</strong> — {duration - monthsNeeded} months ahead of schedule!</span>
                  ) : (
                    <span>You need <strong>{duration + Math.ceil(shortfall / deposit)} months</strong> total to reach ৳{targetNum.toLocaleString()}. Consider increasing your monthly deposit.</span>
                  )}
                </div>
              )}

              <Link href="/register" className="block w-full py-3 bg-white text-primary rounded-xl text-center font-semibold hover:bg-primary/10 transition">
                Start Saving Now →
              </Link>
            </div>
          </div>

          <div className="mt-6 p-4 bg-card border border-border rounded-xl">
            <p className="text-xs text-foreground/50 leading-relaxed">
              ⚠️ <strong>Disclaimer:</strong> This calculator shows projected savings totals based on your inputs. 
              Amanah Savings Community is not an investment platform and does not offer any guaranteed returns, 
              fixed profits, or interest. All figures represent community savings deposits only.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-primary text-sm font-semibold mb-2">Common Questions</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Plans FAQ</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/5 transition"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown size={18} className={`text-primary transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border"
                    >
                      <div className="px-6 py-4">
                        <p className="text-foreground/70 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-linear-to-r from-primary to-primary-light rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to Start Saving?</h2>
            <p className="text-white/90 mb-6">Join 47,000+ members already building their savings goals with Amanah.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-primary/10 transition">
                Open Free Account →
              </Link>
              <Link href="/contact" className="px-6 py-3 border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/10 transition">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanPage;