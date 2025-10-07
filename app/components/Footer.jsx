"use client";

import { Mail, MapPin, Phone, Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 py-10 mt-10 relative overflow-hidden">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-blue-200 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-extrabold text-gray-800 mb-4">
            Resume<span className="text-blue-600">AI</span>
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Empowering professionals to create stunning, job-winning resumes
            with the power of AI and modern design.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-600 transition">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-blue-600 transition">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-blue-600 transition">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link href="#" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-600 transition">
                Templates
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-600 transition">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Support</h4>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link href="#" className="hover:text-blue-600 transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-600 transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-600 transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-600 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Get In Touch
          </h4>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>support@resumeai.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>New York, USA</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-16 border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ResumeAI — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
