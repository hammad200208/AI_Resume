"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Specialist",
    image: "/user1.jfif",
    review:
      "This AI resume builder completely changed my job search. I landed three interviews within a week of updating my resume. Super easy to use and the templates look stunning!",
    rating: 5,
  },
  {
    id: 2,
    name: "David Lee",
    role: "Software Engineer",
    image: "/user2.jfif",
    review:
      "The best tool I’ve used for creating resumes! The AI suggestions helped me describe my skills perfectly. It got me noticed by top companies.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Project Manager",
    image: "/user3.jfif",
    review:
      "Clean, professional, and effective. My resume looks so much more polished now. I love how it highlights my achievements clearly!",
    rating: 4,
  },
];

const CustomerReviewSection = () => {
  return (
    <section className="py-10 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Decorative Background Blur Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-16 max-w-3xl mx-auto">
          Professionals worldwide trust our AI-powered resume builder to get
          noticed, land interviews, and advance their careers.
        </p>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl border border-white/40 p-10 transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-5 left-8 bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-3 rounded-full shadow-lg">
                <Quote className="w-5 h-5" />
              </div>

              {/* User Image */}
              <div className="flex justify-center mb-6">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={90}
                  height={90}
                  className="rounded-full object-cover shadow-lg border-4 border-white"
                />
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                “{review.review}”
              </p>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Name & Role */}
              <h3 className="text-xl font-semibold text-gray-800">
                {review.name}
              </h3>
              <p className="text-sm text-gray-500">{review.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewSection;
