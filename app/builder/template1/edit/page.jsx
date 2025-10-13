"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function EditBuilderPage1() {
  const [formData, setFormData] = useState({
    education: [],
    contact: [],
    experience: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const resumeRef = useRef();

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
    const canvas = await html2canvas(resumeElement, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("resume.pdf");
  };

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
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Professional Template Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ---------------- Form ---------------- */}
        <div className="bg-white p-6 shadow rounded-lg overflow-y-auto max-h-[80vh]">
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

            {/* Education */}
            {renderSection("education", "Education", [
              { key: "degree", label: "Degree", type: "text" },
              { key: "institution", label: "Institution", type: "text" },
              { key: "year", label: "Year", type: "text" },
            ])}

            {/* Contact */}
            {renderSection("contact", "Contact", [
              { key: "email", label: "Email", type: "text" },
              { key: "phone", label: "Phone", type: "text" },
              { key: "address", label: "Address", type: "text" },
            ])}

            {/* Experience */}
            {renderSection("experience", "Work Experience", [
              { key: "title", label: "Job Title", type: "text" },
              { key: "company", label: "Company", type: "text" },
              { key: "years", label: "Years", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ])}

            <button
              onClick={downloadResume}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* ---------------- Preview ---------------- */}
        <div className="bg-gray-50 p-6 shadow rounded-lg overflow-y-auto max-h-[80vh]">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>

          <div
            ref={resumeRef}
            id="resume-preview"
            className="bg-white  rounded-lg overflow-hidden flex flex-col md:flex-row relative"
          >
            {/* Left Column */}
            <div className="md:w-1/3 bg-gray-100 p-5 text-center space-y-4">
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
                <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-sm text-blue-600">{formData.profession}</p>
              </div>

              {formData.about && (
                <div className="text-left">
                  <h3 className="font-semibold text-gray-700 mb-1">About Me</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{formData.about}</p>
                </div>
              )}

              {Array.isArray(formData.education) && formData.education.length > 0 && (
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

              {Array.isArray(formData.contact) && formData.contact.length > 0 && (
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
            </div>

            {/* Right Column */}
            <div className="md:w-2/3 p-6">
              {Array.isArray(formData.experience) && formData.experience.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
                    Work Experience
                  </h3>
                  {formData.experience.map((exp, i) => (
                    <div key={i} className="text-sm text-gray-600 mb-3">
                      <p className="font-medium">
                        {exp.title} {exp.company && `- ${exp.company}`}
                      </p>
                      <p className="text-xs text-gray-500">{exp.years}</p>
                      <p>{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* -------- Beautiful Footer Image -------- */}
          <div className="relative w-full  rounded-b-lg overflow-hidden shadow-md">
            <div className="absolute inset-0 "></div>
            <Image
              src="/ft.png"
              alt="Footer Banner"
              width={1200}
              height={150}
              className="w-full h-52 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
