"use client";
import React, { useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function MinimalTemplate() {
  const [formData, setFormData] = useState({
    image: "",
    aboutMe: "",
    objective: "",
    education: [],
    languages: [],
    references: [],
    fullName: "",
    profession: "",
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    interests: [],
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRepeaterChange = (key, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[key]];
      updated[index][field] = value;
      return { ...prev, [key]: updated };
    });
  };

  const addRepeaterItem = (key, fields) => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], Object.fromEntries(fields.map((f) => [f.key, ""]))],
    }));
  };

  const downloadPDF = async () => {
    const resume = document.getElementById("resume-preview");
    const canvas = await html2canvas(resume);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save(`${formData.fullName || "resume"}.pdf`);
  };

  const repeaterFields = {
    education: [
      { key: "degree", label: "Degree / Program" },
      { key: "institution", label: "Institution" },
      { key: "year", label: "Year of Completion" },
    ],
    languages: [
      { key: "language", label: "Language" },
      { key: "proficiency", label: "Proficiency" },
    ],
    references: [
      { key: "name", label: "Name" },
      { key: "designation", label: "Designation" },
      { key: "contact", label: "Contact Info" },
    ],
    experience: [
      { key: "title", label: "Job Title" },
      { key: "company", label: "Company" },
      { key: "duration", label: "Duration" },
      { key: "description", label: "Description" },
    ],
    skills: [{ key: "skill", label: "Skill" }],
    projects: [
      { key: "title", label: "Project Title" },
      { key: "description", label: "Description" },
    ],
    certifications: [
      { key: "name", label: "Certification Name" },
      { key: "issuer", label: "Issued By" },
      { key: "year", label: "Year" },
    ],
    interests: [{ key: "interest", label: "Interest" }],
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 space-y-4 overflow-y-auto h-[90vh] border p-4 rounded-lg shadow bg-white">
        <h1 className="text-2xl font-semibold mb-3 text-center">Minimal Template Editor</h1>

        {/* Image */}
        <label className="block">
          Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => handleChange("image", reader.result);
                reader.readAsDataURL(file);
              }
            }}
            className="w-full border p-2 mt-1"
          />
        </label>

        {[
          { key: "fullName", label: "Full Name" },
          { key: "profession", label: "Profession / Title" },
          { key: "aboutMe", label: "About Me", textarea: true },
          { key: "objective", label: "Career Objective", textarea: true },
        ].map(({ key, label, textarea }) => (
          <label key={key} className="block">
            {label}
            {textarea ? (
              <textarea
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border p-2 mt-1"
              />
            ) : (
              <input
                type="text"
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border p-2 mt-1"
              />
            )}
          </label>
        ))}

        {Object.entries(repeaterFields).map(([key, fields]) => (
          <div key={key} className="border p-3 rounded-md">
            <h2 className="font-semibold mb-2 capitalize">{key}</h2>
            {formData[key].map((item, index) => (
              <div key={index} className="mb-2 border-b pb-2">
                {fields.map((field) => (
                  <input
                    key={field.key}
                    type="text"
                    placeholder={field.label}
                    value={item[field.key]}
                    onChange={(e) =>
                      handleRepeaterChange(key, index, field.key, e.target.value)
                    }
                    className="w-full border p-1 mt-1"
                  />
                ))}
              </div>
            ))}
            <button
              onClick={() => addRepeaterItem(key, fields)}
              className="bg-gray-800 text-white px-2 py-1 mt-1 text-sm rounded"
            >
              + Add {key}
            </button>
          </div>
        ))}

        <button
          onClick={downloadPDF}
          className="w-full bg-green-600 text-white py-2 rounded mt-3 font-medium"
        >
          Download PDF
        </button>
      </div>

      {/* Right: Preview */}
      <div
        id="resume-preview"
        className="w-full md:w-1/2 border rounded-lg shadow-lg bg-white overflow-hidden"
      >
        <div className="flex min-h-full">
          {/* Left column */}
          <div className="w-1/3 min-h-full bg-[#e5c2b2] text-black p-5 flex flex-col justify-start">
            {formData.image && (
              <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-black">
                <Image
                  src={formData.image}
                  alt="profile"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <h2 className="text-lg font-semibold mb-2 text-black">About Me</h2>
            <p className="text-sm mb-3 text-black">{formData.aboutMe}</p>

            <h2 className="text-lg font-semibold mb-2 text-black">Career Objective</h2>
            <p className="text-sm mb-3 text-black">{formData.objective}</p>

            <h2 className="text-lg font-semibold mb-2 text-black">Education</h2>
            {formData.education.map((edu, i) => (
              <p key={i} className="text-sm mb-1 text-black">
                <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
              </p>
            ))}

            <h2 className="text-lg font-semibold mt-3 mb-2 text-black">Languages</h2>
            {formData.languages.map((lang, i) => (
              <p key={i} className="text-sm text-black">
                {lang.language} ({lang.proficiency})
              </p>
            ))}

            <h2 className="text-lg font-semibold mt-3 mb-2 text-black">References</h2>
            {formData.references.map((ref, i) => (
              <p key={i} className="text-sm mb-1 text-black">
                {ref.name} — {ref.designation} ({ref.contact})
              </p>
            ))}
          </div>

          {/* Right column */}
          <div className="w-2/3 pl-6 bg-white text-black">
            <h1 className="text-2xl font-bold">{formData.fullName}</h1>
            <h3 className="text-lg mb-4">{formData.profession}</h3>

            <h2 className="font-semibold text-lg mb-2">Experience</h2>
            {formData.experience.map((exp, i) => (
              <div key={i} className="mb-2">
                <p className="text-sm font-semibold">
                  {exp.title} — {exp.company} ({exp.duration})
                </p>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}

            <h2 className="font-semibold text-lg mt-3 mb-2">Skills</h2>
            <ul className="list-disc pl-5 text-sm">
              {formData.skills.map((s, i) => (
                <li key={i}>{s.skill}</li>
              ))}
            </ul>

            <h2 className="font-semibold text-lg mt-3 mb-2">Projects</h2>
            {formData.projects.map((p, i) => (
              <div key={i}>
                <p className="font-semibold text-sm">{p.title}</p>
                <p className="text-sm">{p.description}</p>
              </div>
            ))}

            <h2 className="font-semibold text-lg mt-3 mb-2">Certifications</h2>
            {formData.certifications.map((c, i) => (
              <p key={i} className="text-sm">
                {c.name} — {c.issuer} ({c.year})
              </p>
            ))}

            <h2 className="font-semibold text-lg mt-3 mb-2">Interests</h2>
            <ul className="list-disc pl-5 text-sm">
              {formData.interests.map((i, idx) => (
                <li key={idx}>{i.interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
