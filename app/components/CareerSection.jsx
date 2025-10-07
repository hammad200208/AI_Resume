"use client";

import Image from "next/image";
import { Briefcase, CheckCircle, Sparkles, ShieldCheck } from "lucide-react";

const CareerSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading and paragraph */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Transform Your Career Journey
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Join thousands of professionals who've accelerated their careers with
            our AI-powered resume builder. Get noticed, land interviews, and
            secure your dream job faster than ever before.
          </p>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 mb-20">
          {/* Left side */}
          <div className="flex flex-col items-start space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Land More Job Interviews
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our ATS-optimized templates and AI-powered content suggestions
                  help your resume get past automated screening systems and into
                  the hands of hiring managers.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-6">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <p className="text-gray-600 text-base">
                Join thousands of professionals who've increased their interview
                rate by{" "}
                <span className="font-semibold text-gray-800">3x</span> using our
                proven system.
              </p>
            </div>
          </div>

          {/* Right side image */}
          <div className="flex justify-center">
            <Image
              src="/temp1.webp"
              alt="Career Success Template"
              width={300}
              height={300}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 mb-20">
          {/* Left side image */}
          <div className="flex justify-center order-1 md:order-none">
            <Image
              src="/temp2.webp"
              alt="Stand Out Template"
              width={300}
              height={300}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Right side text */}
          <div className="flex flex-col items-start space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Stand Out From The Competition
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  With professional designs and compelling content
                  recommendations, showcase your unique value proposition and get
                  noticed faster by recruiters.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-6">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <p className="text-gray-600 text-base">
                Our smart formatting and keyword optimization ensure your resume
                catches attention in seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left side text */}
          <div className="flex flex-col items-start space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Build Confidence In Your Job Search
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Present your best professional self with a polished, error-free
                  resume that reflects your true potential and professional
                  accomplishments.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-6">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <p className="text-gray-600 text-base">
                Feel confident knowing your application materials are
                professionally crafted and industry-compliant.
              </p>
            </div>
          </div>

          {/* Right side image */}
          <div className="flex justify-center">
            <Image
              src="/temp3.png"
              alt="Confidence Template"
              width={300}
              height={300}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
