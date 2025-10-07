"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const fullText = "Build Your Resume With AI";
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = 100;
    let deletingSpeed = 60;

    const type = () => {
      setText((prev) => {
        if (!isDeleting) {
          if (prev.length < fullText.length) {
            return fullText.substring(0, prev.length + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1000); // small pause before deleting
            return prev;
          }
        } else {
          if (prev.length > 0) {
            return fullText.substring(0, prev.length - 1);
          } else {
            setTimeout(() => setIsDeleting(false), 500); // small pause before typing again
            return "";
          }
        }
      });
    };

    const timer = setInterval(type, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearInterval(timer);
  }, [text, isDeleting]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[90vh] text-center bg-gradient-to-br from-white via-blue-50 to-blue-100 px-6">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
        {text}
        <span className="border-r-4 border-blue-600 ml-1 animate-pulse" />
      </h1>

      <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl">
        Craft a stunning, professional resume in seconds — powered by smart AI tools built for you.
      </p>

      <Link
        href="/templates"
        className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
      >
        Get Started
      </Link>
    </section>
  );
};

export default Hero;
