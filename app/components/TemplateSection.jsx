"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const templates = [
  {
    id: 1,
    img: "/temp1.webp",
    title: "Professional Template",
    desc: "Clean and elegant layout designed for professionals to make a great first impression.",
  },
  {
    id: 2,
    img: "/temp2.webp",
    title: "Modern Template",
    desc: "A creative and modern design perfect for tech roles and innovative industries.",
  },
  {
    id: 3,
    img: "/temp3.png",
    title: "Minimal Template",
    desc: "Simple, clear, and easy-to-read template focusing on your achievements and skills.",
  },
];

const TemplateSection = () => {
  const router = useRouter();

  const handleUseTemplate = (id) => {
    router.push(`/builder/${id}`);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-16">
          Choose Your Perfect Template
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[4/5] bg-gray-100 flex items-center justify-center">
                <Image
                  src={template.img}
                  alt={template.title}
                  fill
                  className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {template.title}
                </h3>
                <p className="text-gray-600 text-base mb-6">{template.desc}</p>

                <button
                  onClick={() => handleUseTemplate(template.id)}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:from-blue-600 hover:to-indigo-600 transition-all"
                >
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateSection;
