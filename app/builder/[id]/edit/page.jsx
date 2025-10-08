"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const templates = {
  1: "/temp1.webp",
  2: "/temp2.webp",
  3: "/temp3.png",
};

export default function ResumeEditor() {
  const { id } = useParams();
  const selectedTemplate = templates[id];

  const [formData, setFormData] = useState({
    name: "John Doe",
    title: "Full Stack Developer",
    email: "john@example.com",
    phone: "+1 (234) 567-890",
    summary:
      "Passionate developer with 5+ years of experience in building responsive and high-performance web applications.",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE — Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Resume Information
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              name="summary"
              placeholder="Professional Summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none"
            />
          </div>

          <button className="mt-6 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all">
            Download Resume
          </button>
        </div>

        {/* RIGHT SIDE — Live Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-center">Live Preview</h3>

          <div className="relative w-full aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden flex flex-col items-center text-left p-6">
            {/* Template background */}
            <div className="absolute inset-0 opacity-10">
              <Image
                src={selectedTemplate}
                alt={`Template ${id}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Resume text overlay */}
            <div className="relative z-10 w-full h-full flex flex-col gap-3 text-gray-800">
              <h1 className="text-3xl font-bold">{formData.name}</h1>
              <h2 className="text-lg font-medium text-gray-600">
                {formData.title}
              </h2>
              <p className="text-sm text-gray-500">
                {formData.email} • {formData.phone}
              </p>
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {formData.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
