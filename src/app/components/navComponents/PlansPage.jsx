"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Check, Loader2, Sparkles, Crown, Star, Diamond, TrendingUp, Shield } from "lucide-react";
import axiosInstance from "../../components/shared/AxiosInstance/AxiosInstance";

const PlanPage = () => {
  const [billingMode, setBillingMode] = useState("monthly");
  const [deposit, setDeposit] = useState(3000);
  const [duration, setDuration] = useState(12);
  const [target, setTarget] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  // Complete plan pricing with all details
  const planPricing = {
    Bronze: {
      monthly: 0,
      yearly: 0,
      tier: "Starter",
      popular: false,
      description: "Perfect for beginners. Save at your own pace with no platform fee.",
      priceLabel: "Free Forever"
    },
    Silver: {
      monthly: 199,
      yearly: 159,
      tier: "Essential",
      popular: false,
      description: "For regular savers building serious momentum with community features.",
      priceLabel: "৳199/month"
    },
    Gold: {
      monthly: 499,
      yearly: 399,
      tier: "Growth",
      popular: true,
      description: "Our flagship plan with AI assistant, unlimited goals, and full circle access.",
      priceLabel: "৳499/month"
    },
    Platinum: {
      monthly: 999,
      yearly: 799,
      tier: "Elite",
      popular: false,
      description: "For power savers who want exclusive features, dedicated support & elite status.",
      priceLabel: "৳999/month"
    }
  };

  // Fetch CMS data
  useEffect(() => {
    const fetchCMSData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/cms");
        console.log("CMS Response:", res.data);
        
        if (res.data.success) {
          setCmsData(res.data.data);
          const cmsPlans = res.data.data?.plans || [];
          
          if (cmsPlans.length > 0) {
            // Merge CMS plans with pricing data
            const mergedPlans = cmsPlans.map(plan => {
              const pricing = planPricing[plan.name] || {
                monthly: 0,
                yearly: 0,
                tier: "Standard",
                popular: false,
                description: `Start your savings journey with our ${plan.name} plan.`,
                priceLabel: "Contact Us"
              };
              
              return {
                ...plan,
                monthlyPrice: pricing.monthly,
                yearlyPrice: pricing.yearly,
                tier: pricing.tier,
                popular: pricing.popular,
                description: pricing.description,
                priceLabel: pricing.priceLabel,
                // Ensure features is always an array
                features: plan.features || []
              };
            });
            setPlans(mergedPlans);
            if (mergedPlans.length > 0) {
              setSelectedPlan(mergedPlans[0]?.name || "");
            }
          } else {
            // Use fallback with pricing
            setPlans(getFallbackPlans());
            setSelectedPlan("Gold");
          }
        } else {
          setPlans(getFallbackPlans());
          setSelectedPlan("Gold");
        }
      } catch (error) {
        console.error("Failed to fetch CMS data:", error);
        setPlans(getFallbackPlans());
        setSelectedPlan("Gold");
      } finally {
        setLoading(false);
      }
    };

    fetchCMSData();
  }, []);

  // Fallback plans with complete pricing
  const getFallbackPlans = () => {
    return [
      {
        name: "Bronze",
        min: 500,
        max: 4999,
        color: "#cd7f32",
        features: ["Basic savings goals", "Monthly reports", "Email support", "Community access"],
        monthlyPrice: 0,
        yearlyPrice: 0,
        tier: "Starter",
        popular: false,
        description: "Perfect for beginners. Save at your own pace with no platform fee.",
        priceLabel: "Free Forever"
      },
      {
        name: "Silver",
        min: 5000,
        max: 14999,
        color: "#c0c0c0",
        features: ["Multiple goals", "Weekly reports", "Priority support", "Streak tracking", "Monthly insights"],
        monthlyPrice: 199,
        yearlyPrice: 159,
        tier: "Essential",
        popular: false,
        description: "For regular savers building serious momentum with community features.",
        priceLabel: "৳199/month"
      },
      {
        name: "Gold",
        min: 15000,
        max: 49999,
        color: "#ffd700",
        features: ["Unlimited goals", "Daily insights", "VIP support", "AI assistant", "Leaderboard access", "Priority withdrawal"],
        monthlyPrice: 499,
        yearlyPrice: 399,
        tier: "Growth",
        popular: true,
        description: "Our flagship plan with AI assistant, unlimited goals, and full circle access.",
        priceLabel: "৳499/month"
      },
      {
        name: "Platinum",
        min: 50000,
        max: null,
        color: "#e5e4e2",
        features: ["Personal advisor", "Custom goals", "API access", "24/7 support", "Early withdrawal benefits", "Dedicated manager"],
        monthlyPrice: 999,
        yearlyPrice: 799,
        tier: "Elite",
        popular: false,
        description: "For power savers who want exclusive features, dedicated support & elite status.",
        priceLabel: "৳999/month"
      }
    ];
  };

  const getPlanIcon = (planName) => {
    const icons = {
      Bronze: <Shield size={28} />,
      Silver: <Star size={28} />,
      Gold: <Crown size={28} />,
      Platinum: <Diamond size={28} />
    };
    return icons[planName] || <Sparkles size={28} />;
  };

  const getPrice = (plan) => {
    return billingMode === "monthly" ? (plan.monthlyPrice || 0) : (plan.yearlyPrice || 0);
  };

  const getOriginalPrice = (plan) => {
    return billingMode === "monthly" ? (plan.monthlyPrice || 0) : (plan.monthlyPrice * 12 || 0);
  };

  const getSavingsPercent = (plan) => {
    if (billingMode !== "yearly") return 0;
    const monthlyTotal = (plan.monthlyPrice || 0) * 12;
    const yearlyPrice = plan.yearlyPrice || 0;
    if (monthlyTotal === 0) return 0;
    return Math.round(((monthlyTotal - yearlyPrice) / monthlyTotal) * 100);
  };

  const getMinDepositFromPlan = (planName) => {
    const plan = plans.find(p => p.name === planName);
    return plan?.min || 500;
  };

  const totalSaved = deposit * duration;
  const targetNum = parseInt(target) || 0;
  const monthsNeeded = targetNum > 0 ? Math.ceil(targetNum / deposit) : 0;
  const shortfall = targetNum > 0 && totalSaved < targetNum ? targetNum - totalSaved : 0;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const minDeposit = getMinDepositFromPlan(selectedPlan);
    if (deposit < minDeposit) {
      setDeposit(minDeposit);
    }
  }, [selectedPlan, plans]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading savings plans...</p>
        </div>
      </div>
    );
  }

  const displayPlans = plans.length > 0 ? plans : getFallbackPlans();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark py-20 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm mb-6">
            <Sparkles size={14} />
            <span>{cmsData?.site?.tagline || "Transparent Savings Plans"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {cmsData?.homepage?.heroTitle || "Choose Your Savings Journey"}
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            {cmsData?.homepage?.heroSubtitle || "Select the perfect plan that matches your savings goals and start building your future today."}
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <div className="text-3xl font-bold text-white">৳{displayPlans[0]?.min || 500}</div>
              <div className="text-white/80 text-sm">Minimum to start</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{displayPlans.length}</div>
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
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${billingMode === "monthly" ? "bg-primary text-white" : "text-foreground/70 hover:text-primary"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingMode("yearly")} 
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${billingMode === "yearly" ? "bg-primary text-white" : "text-foreground/70 hover:text-primary"}`}
              >
                Yearly <span className="text-primary-400 text-xs ml-1">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className={`relative bg-card border rounded-2xl p-6 transition-all ${plan.popular ? "border-primary shadow-lg shadow-primary/20" : "border-border hover:border-primary/40"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {getPlanIcon(plan.name)}
                </div>
                <div className="text-xs font-bold text-primary mb-1">{plan.name}</div>
                <div className="text-xl font-bold text-foreground mb-1">{plan.tier}</div>
                
                {/* Price Display */}
                <div className="mb-2">
                  {getPrice(plan) === 0 ? (
                    <span className="text-2xl font-bold text-foreground">Free</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">৳{getPrice(plan).toLocaleString()}</span>
                      <span className="text-foreground/50 text-sm">/month</span>
                    </div>
                  )}
                  {billingMode === "yearly" && getPrice(plan) > 0 && (
                    <div className="text-xs text-green-500 mt-1">
                      Save {getSavingsPercent(plan)}% annually
                    </div>
                  )}
                </div>

                {/* Min Deposit Info */}
                <div className="text-xs text-foreground/50 mb-3">
                  Min deposit: ৳{plan.min.toLocaleString()}/month
                </div>

                <p className="text-foreground/60 text-sm mb-4">{plan.description}</p>
                
                {/* Features List */}
                <div className="mt-4 mb-6">
                  {plan.features && plan.features.slice(0, 6).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-1.5">
                      <Check size={14} className="text-primary shrink-0" />
                      <span className="text-xs text-foreground/70">{typeof feature === 'string' ? feature : feature.text || feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/register" 
                  className={`block w-full py-3 rounded-xl text-center font-semibold text-sm transition ${plan.popular ? "bg-primary text-white shadow-lg shadow-primary/20" : "border border-border text-foreground hover:border-primary hover:text-primary"}`}
                >
                  Choose {plan.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-primary text-sm font-semibold mb-2">Savings Calculator</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Plan Your Savings Goal</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">Adjust the parameters to see your savings projection.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">Configure Your Plan</h3>
              <p className="text-foreground/60 text-sm mb-6">Estimate how fast you'll reach your goal with consistent monthly saving.</p>

              <div className="space-y-5">
                <div>
                  <label className="flex justify-between text-sm font-medium text-foreground/80 mb-2">
                    <span>Savings Plan</span>
                    <span className="text-primary">{selectedPlan}</span>
                  </label>
                  <select 
                    value={selectedPlan} 
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary transition"
                  >
                    {displayPlans.map(plan => (
                      <option key={plan.name} value={plan.name}>
                        {plan.name} — {plan.monthlyPrice === 0 ? "Free" : `৳${plan.monthlyPrice}/mo`} (Min: ৳{plan.min.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex justify-between text-sm font-medium text-foreground/80 mb-2">
                    <span>Monthly Deposit</span>
                    <span className="text-primary">৳{deposit.toLocaleString()}</span>
                  </label>
                  <input 
                    type="range" 
                    min={getMinDepositFromPlan(selectedPlan)} 
                    max="100000" 
                    step="500" 
                    value={deposit} 
                    onChange={(e) => setDeposit(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-foreground/50 mt-1">
                    <span>Min: ৳{getMinDepositFromPlan(selectedPlan).toLocaleString()}</span>
                    <span>Max: ৳100,000</span>
                  </div>
                </div>

                <div>
                  <label className="flex justify-between text-sm font-medium text-foreground/80 mb-2">
                    <span>Duration</span>
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
                  <div className="flex justify-between text-xs text-foreground/50 mt-1">
                    <span>3 months</span>
                    <span>5 years</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-2 block">
                    Target Amount (Optional)
                  </label>
                  <input 
                    type="number" 
                    placeholder="e.g., 500000" 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>
            </div>

            {/* Calculator Result */}
            <div className="bg-primary rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} />
                <h4 className="text-sm opacity-90">Projected Savings</h4>
              </div>
              <div className="text-4xl font-bold mb-6">৳{totalSaved.toLocaleString()}</div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <div className="text-xs opacity-80">Monthly</div>
                  <div className="text-lg font-bold">৳{deposit.toLocaleString()}</div>
                </div>
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <div className="text-xs opacity-80">Duration</div>
                  <div className="text-lg font-bold">{duration} months</div>
                </div>
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <div className="text-xs opacity-80">Target Reached</div>
                  <div className="text-lg font-bold">
                    {targetNum > 0 ? (totalSaved >= targetNum ? `${monthsNeeded} mo` : `${duration + Math.ceil(shortfall / deposit)} mo`) : "—"}
                  </div>
                </div>
              </div>

              {targetNum > 0 && (
                <div className="text-sm opacity-90 mb-6">
                  {totalSaved >= targetNum ? (
                    <span>🎉 You'll reach your target in <strong>{monthsNeeded} months</strong>, {duration - monthsNeeded} months ahead of schedule!</span>
                  ) : (
                    <span>📊 You need <strong>{duration + Math.ceil(shortfall / deposit)} months</strong> total to reach your target. Consider increasing your monthly deposit.</span>
                  )}
                </div>
              )}

              <div className="border-t border-white/20 my-4 pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Plan fee ({billingMode})</span>
                  <span>
                    {(() => {
                      const selectedPlanData = displayPlans.find(p => p.name === selectedPlan);
                      if (selectedPlanData?.monthlyPrice === 0) return "Free";
                      const fee = billingMode === "monthly" ? selectedPlanData?.monthlyPrice : selectedPlanData?.yearlyPrice;
                      return `৳${fee?.toLocaleString()}/${billingMode === "monthly" ? "mo" : "year"}`;
                    })()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span>Total with fees</span>
                  <span>
                    {(() => {
                      const selectedPlanData = displayPlans.find(p => p.name === selectedPlan);
                      if (selectedPlanData?.monthlyPrice === 0) return `৳${totalSaved.toLocaleString()}`;
                      const fee = billingMode === "monthly" 
                        ? selectedPlanData?.monthlyPrice * duration 
                        : selectedPlanData?.yearlyPrice * Math.ceil(duration / 12);
                      return `৳{(totalSaved + fee).toLocaleString()}`;
                    })()}
                  </span>
                </div>
              </div>

              <Link href="/register" className="block w-full py-3 bg-white text-primary rounded-xl text-center font-semibold hover:bg-white/90 transition mt-4">
                Start Saving Now
              </Link>
            </div>
          </div>

          <div className="mt-6 p-4 bg-card border border-border rounded-xl">
            <p className="text-xs text-foreground/50 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator shows projected savings totals based on your inputs. 
              Sonchoy Bondhu Community is not an investment platform and does not offer any guaranteed returns, 
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {(cmsData?.faq || []).map((faq, index) => (
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
                  <span className="font-semibold text-foreground">{faq.question}</span>
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
                        <p className="text-foreground/70 text-sm leading-relaxed">{faq.answer}</p>
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
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to Start Saving?</h2>
            <p className="text-white/90 mb-6">Join thousands of members already building their savings goals with Sanchoy Bondhu.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition">
                Create Free Account
              </Link>
              <Link href="/contact" className="px-6 py-3 border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/10 transition">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanPage;