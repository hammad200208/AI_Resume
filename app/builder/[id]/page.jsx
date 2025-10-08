"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const templates = {
  1: "/temp1.webp",
  2: "/temp2.webp",
  3: "/temp3.png",
};

export default function BuilderPage() {
  const { id } = useParams();
  const router = useRouter();
  const selectedTemplate = templates[id];

  const handleEditClick = () => {
    router.push(`/builder/${id}/edit`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Resume Builder
        </h1>

        <p className="text-gray-600 mb-10">
          You are using the <span className="font-semibold">Template {id}</span>
        </p>

        <div className="flex justify-center">
          <div className="relative w-[400px] aspect-[3/4] bg-white rounded-xl shadow-lg">
            <Image
              src={selectedTemplate}
              alt={`Template ${id}`}
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        <div className="mt-10">
          <Link href={`/builder/${id}/edit`}>
          <button
            onClick={handleEditClick}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all"
          >
            Start Editing
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
