"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function EditBuilderPage1() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    education: [],
    contact: [],
    experience: [],
    skills: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const resumeRef = useRef();

  // -------------------- Mount Check --------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // -------------------- Local Storage --------------------
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
  }, [formData]);

  // -------------------- Handlers --------------------
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSectionChange = (key, index, fieldKey, value) => {
    const updated = [...(formData[key] || [])];
    updated[index] = { ...(updated[index] || {}), [fieldKey]: value };
    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  const addSectionItem = (key) => {
    const updated = [...(formData[key] || []), {}];
    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  const removeSectionItem = (key, index) => {
    const updated = [...(formData[key] || [])];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setImagePreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const downloadResume = async () => {
    const resumeElement = resumeRef.current;
    if (!resumeElement) return alert("Nothing to export!");

    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("resume.pdf");
  };

  // -------------------- AI Resume Generation --------------------
  const handleGenerateAI = async () => {
  const prompt = `
You are a resume writing assistant.
Rewrite the following user-provided resume details into a short, well-structured "About Me" paragraph.
- Keep the original tone and personality of the user's writing.
- Use professional, natural language.
- Limit the response to 60–80 words maximum.
- Do not add introductions, titles, or quotes — only return the clean paragraph text.

User's resume information:
${JSON.stringify(formData, null, 2)}
`;
const token = localStorage.getItem("token");
console.log("🪙 Token being sent:", token);
  try {
    console.log("🟢 Starting AI Resume Generation...");
    console.log("📤 Prompt being sent to backend:", prompt);
    setLoading(true);

    const response = await fetch("https://resumenbackend.vercel.app/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    console.log("📥 Raw Response:", response)
    if (!response.ok) throw new Error("Failed to generate AI summary");

    const data = await response.json();
    console.log("✅ Response JSON:", data);

    // Clean up any extra formatting or quotes
    const cleanText = data.text
      ?.replace(/^["'\s]*(Here.*?:\s*)?/i, "")
      ?.replace(/^["']|["']$/g, "")
      ?.trim();
    console.log("🧹 Cleaned AI Text:", cleanText);
    if (!cleanText) {
      console.warn("⚠️ No AI text returned. Using fallback.");
    }
    setFormData((prev) => ({
      ...prev,
      about: cleanText || prev.about,
    }));

    setAiPrompt("");
    console.log("✅ Form data updated successfully with AI text.");
  } catch (err) {
    console.error(err);
    alert("Error generating AI summary.");
  } finally {
    setLoading(false);
    console.log("🕓 AI generation process complete.");
  }
};


  // -------------------- Render Helper --------------------
  const renderSection = (key, label, fields) => (
    <div key={key} className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      {(formData[key] || []).map((item, index) => (
        <div key={index} className="border p-3 mb-3 rounded-md bg-gray-50">
          {fields.map((f) => (
            <div key={f.key} className="mb-2">
              <label className="block text-sm font-medium mb-1">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={item[f.key] || ""}
                  onChange={(e) => handleSectionChange(key, index, f.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              ) : (
                <input
                  type={f.type}
                  value={item[f.key] || ""}
                  onChange={(e) => handleSectionChange(key, index, f.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => removeSectionItem(key, index)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addSectionItem(key)}
        className="text-blue-600 text-sm hover:underline"
      >
        + Add More
      </button>
    </div>
  );

  // -------------------- UI --------------------
  if (!mounted) return <div className="p-6 text-center text-gray-500">Loading builder...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Professional Template Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ---------------- Form ---------------- */}
        <div className="bg-white p-6 shadow-md rounded-lg overflow-y-auto max-h-[80vh] border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Fill Details</h2>

          <div>
            {/* Photo */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Profile Photo</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            {/* Basic Info */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Profession</label>
              <input
                type="text"
                value={formData.profession || ""}
                onChange={(e) => handleChange("profession", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">About Me</label>
              <textarea
                rows={3}
                value={formData.about || ""}
                onChange={(e) => handleChange("about", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Sections */}
            {renderSection("education", "Education", [
              { key: "degree", label: "Degree", type: "text" },
              { key: "institution", label: "Institution", type: "text" },
              { key: "year", label: "Year", type: "text" },
            ])}

            {renderSection("contact", "Contact", [
              { key: "email", label: "Email", type: "text" },
              { key: "phone", label: "Phone", type: "text" },
              { key: "address", label: "Address", type: "text" },
            ])}

            {renderSection("experience", "Work Experience", [
              { key: "title", label: "Job Title", type: "text" },
              { key: "company", label: "Company", type: "text" },
              { key: "years", label: "Years", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ])}

            {renderSection("skills", "Skills", [{ key: "skill", label: "Skill", type: "text" }])}

            {/* AI Resume Generator */}
            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">Generate with AI</h3>
              <textarea
                rows={2}
                placeholder="Write a prompt, e.g. 'Create a resume for a software engineer with 5 years experience in AI.'"
                className="w-full border border-gray-300 rounded-md p-2 mb-2"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <button
                onClick={handleGenerateAI}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Resume"}
              </button>
            </div>

            <button
              onClick={downloadResume}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* ---------------- Preview ---------------- */}
        <div className="bg-gray-50 p-6 shadow-md rounded-lg overflow-y-auto max-h-[80vh] border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>

          <div
            ref={resumeRef}
            id="resume-preview"
            className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row shadow-lg border border-gray-100"
          >
            {/* Left Column */}
            <div className="relative md:w-1/3 bg-gray-100 p-5 text-center space-y-4">
              <div className="hidden md:block absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300"></div>

              {imagePreview && (
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
                  <Image
                    src={imagePreview}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {formData.name || "Your Name"}
                </h2>
                <p className="text-sm text-blue-600">
                  {formData.profession || "Your Profession"}
                </p>
              </div>

              {formData.about && (
  <div className="text-left">
    <h3 className="font-semibold text-gray-700 mb-1">About Me</h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      {formData.about.split(" ").length > 80
        ? formData.about.split(" ").slice(0, 80).join(" ") + "..."
        : formData.about}
    </p>
  </div>
)}


              {formData.education?.length > 0 && (
                <div className="text-left">
                  <h3 className="font-semibold text-gray-700 mb-1">Education</h3>
                  {formData.education.map((edu, i) => (
                    <div key={i} className="text-sm text-gray-600 mb-2">
                      <p className="font-medium">{edu.degree}</p>
                      <p>{edu.institution}</p>
                      <p className="text-xs text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              )}

              {formData.contact?.length > 0 && (
                <div className="text-left">
                  <h3 className="font-semibold text-gray-700 mb-1">Contact</h3>
                  {formData.contact.map((c, i) => (
                    <div key={i} className="text-sm text-gray-600 mb-1">
                      <p>{c.email}</p>
                      <p>{c.phone}</p>
                      <p>{c.address}</p>
                    </div>
                  ))}
                </div>
              )}

              {formData.skills?.length > 0 && (
                <div className="text-left">
                  <h3 className="font-semibold text-gray-700 mb-1">Skills</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {formData.skills.map((s, i) => (
                      <li key={i}>{s.skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="md:w-2/3 p-6 bg-gray-50">
              {formData.experience?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
                    Work Experience
                  </h3>
                  {formData.experience.map((exp, i) => (
                    <div key={i} className="text-sm text-gray-600 mb-3">
                      <p className="font-medium">
                        {exp.title || "Job Title"} {exp.company && `- ${exp.company}`}
                      </p>
                      <p className="text-xs text-gray-500">{exp.years || ""}</p>
                      <p>{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
