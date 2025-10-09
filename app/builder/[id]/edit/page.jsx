"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// Lazy load each template editor (faster and cleaner)
const Template1Editor = dynamic(() => import("../../template1/edit/page"), { ssr: false });
const Template2Editor = dynamic(() => import("../../template2/edit/page"), { ssr: false });
const Template3Editor = dynamic(() => import("../../template3/edit/page"), { ssr: false });

export default function EditBuilderRouter() {
  const { id } = useParams();

  if (id === "1") return <Template1Editor />;
  if (id === "2") return <Template2Editor />;
  if (id === "3") return <Template3Editor />;

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
      Invalid template ID.
    </div>
  );
}
