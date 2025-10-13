"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react";
import Footer from "../components/Footer";

export default function PricingPage() {
  const plans = [
    {
      id: 1,
      name: "Premium Monthly",
      price: "10",
      duration: "month",
      payText: "Pay $10 for 1 month",
      color: "from-blue-500 to-cyan-500",
      button: "bg-blue-500 hover:bg-blue-600",
      features: [
        "Unlimited PDF Downloads",
        "Unlimited Resumes",
        "Non-Recurring Payment",
      ],
    },
    {
      id: 2,
      name: "Premium Half Year",
      price: "8.33",
      duration: "month",
      payText: "Pay $50 for 6 months",
      color: "from-purple-500 to-violet-500",
      button: "bg-purple-500 hover:bg-purple-600",
      features: [
        "Unlimited PDF Downloads",
        "Unlimited Resumes",
        "Non-Recurring Payment",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Premium Yearly",
      price: "7.50",
      duration: "month",
      payText: "Pay $90 for 1 year",
      color: "from-orange-500 to-amber-500",
      button: "bg-orange-500 hover:bg-orange-600",
      features: [
        "Unlimited PDF Downloads",
        "Unlimited Resumes",
        "Non-Recurring Payment",
      ],
    },
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Custom Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          PRICING PLANS
        </h2>
        <h3 className="text-xl sm:text-2xl text-gray-600 mb-2">
          Choose the Perfect Plan for Your Needs
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16">
          Get unlimited access to professional templates and advanced features
          with our flexible pricing options.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular ? "ring-2 ring-purple-400" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 px-4 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
                  🔥 Most Popular
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-6`}
              >
                <span className="text-white text-2xl font-bold">
                  {plan.name[0]}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-500 mb-6">{plan.payText}</p>

              <div className="text-4xl font-extrabold text-gray-800 mb-1">
                ${plan.price}
                <span className="text-base font-medium text-gray-500">
                  /{plan.duration}
                </span>
              </div>

              <ul className="text-gray-600 mt-6 space-y-3 text-left w-full">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-10 w-full py-3 text-white rounded-lg font-semibold shadow-md ${plan.button} transition-all`}
              >
                Upgrade & Download Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
