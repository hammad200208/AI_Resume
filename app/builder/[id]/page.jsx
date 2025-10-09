"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const templates = {
  1: {
    image: "/temp1.webp",
    accentFrom: "from-emerald-600",
    accentTo: "to-green-500",
    bg: "bg-gradient-to-br from-gray-50 via-emerald-50 to-green-100",
    title: "Classic Professional Resume Builder",
    description:
      "You’ve selected Template 1 — create a timeless, elegant professional resume with clean typography and balanced layout.",
  },
  2: {
    image: "/temp2.webp",
    accentFrom: "from-blue-600",
    accentTo: "to-cyan-500",
    bg: "bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100",
    title: "Modern Resume Builder",
    description:
      "You’ve selected Template 2 — a fresh, modern layout designed for professionals who want creativity and structure together.",
  },
  3: {
    image: "/temp3.png",
    accentFrom: "from-gray-700",
    accentTo: "to-gray-500",
    bg: "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300",
    title: "Minimal Resume Builder",
    description:
      "You’ve selected Template 3 — simple, minimal, and perfect for a clean portfolio-style resume.",
  },
};

export default function BuilderPage() {
  const { id } = useParams();
  const router = useRouter();
  const selectedTemplate = templates[id];

  const handleEditClick = () => {
    router.push(`/builder/${id}/edit`);
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Invalid template ID.
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${selectedTemplate.bg} py-16 px-6 flex flex-col items-center`}
    >
      {/* Header */}
      <div className="max-w-4xl text-center">
        <h1
          className={`text-5xl font-extrabold bg-gradient-to-r ${selectedTemplate.accentFrom} ${selectedTemplate.accentTo} bg-clip-text text-transparent mb-6`}
        >
          {selectedTemplate.title}
        </h1>

        <p className="text-gray-700 text-lg mb-10">{selectedTemplate.description}</p>
      </div>

      {/* Template Preview */}
      <div className="relative w-[320px] sm:w-[400px] aspect-[3/4] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden hover:scale-[1.02] transition-transform duration-300">
        <Image
          src={selectedTemplate.image}
          alt={`Template ${id}`}
          fill
          className="object-contain p-6"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-200/40 pointer-events-none"></div>
      </div>

      {/* Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Link href={`/builder/${id}/edit`}>
          <button
            onClick={handleEditClick}
            className={`px-10 py-3 bg-gradient-to-r ${selectedTemplate.accentFrom} ${selectedTemplate.accentTo} text-white rounded-lg font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
          >
            Start Editing
          </button>
        </Link>

        <Link href="/">
          <button className="px-10 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-300">
            Choose Another Template
          </button>
        </Link>
      </div>
    </div>
  );
}
