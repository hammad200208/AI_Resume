"use client";

import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Template2EditPage = () => {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    profession: "",
    contact: [{ type: "", value: "" }],
    about: "",
    introduction: "",
    experience: [{ title: "", company: "", years: "", details: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [{ skill: "", level: "" }],
    languages: [{ language: "", level: "" }],
    references: [{ name: "", contact: "" }],
  });

  const previewRef = useRef(null);

  // ---------- HANDLERS ----------
  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (key, file) =>
    setFormData((prev) => ({ ...prev, [key]: file }));

  const handleSectionChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const addSectionItem = (section, template) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...template }],
    }));
  };

  // ---------- PDF DOWNLOAD ----------
  const downloadResume = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${formData.name || "resume"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-6">
        {/* ---------- FORM BUILDER ---------- */}
        <div className="bg-white shadow rounded-lg p-6 overflow-y-auto max-h-[90vh]">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Fill Resume Details
          </h2>

          {/* Photo */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Profile Photo</label>
            <input
              type="file"
              onChange={(e) => handleFileChange("photo", e.target.files[0])}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Profession */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Profession</label>
            <input
              type="text"
              value={formData.profession}
              onChange={(e) => handleChange("profession", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Contact Info */}
          <div className="mb-4">
            <label className="font-semibold text-lg block mb-2">
              Contact Info
            </label>
            {formData.contact.map((item, i) => (
              <div key={i} className="border rounded-md p-3 mb-3">
                <input
                  type="text"
                  placeholder="Type (Email, Phone)"
                  value={item.type}
                  onChange={(e) =>
                    handleSectionChange("contact", i, "type", e.target.value)
                  }
                  className="w-full border rounded-md p-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) =>
                    handleSectionChange("contact", i, "value", e.target.value)
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}
            <button
              onClick={() => addSectionItem("contact", { type: "", value: "" })}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Contact
            </button>
          </div>

          {/* About */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">About Me</label>
            <textarea
              value={formData.about}
              onChange={(e) => handleChange("about", e.target.value)}
              className="w-full border rounded-md p-2 h-24"
            />
          </div>

          {/* Introduction */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">
              Resume Introduction
            </label>
            <textarea
              value={formData.introduction}
              onChange={(e) => handleChange("introduction", e.target.value)}
              className="w-full border rounded-md p-2 h-24"
            />
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <label className="font-semibold text-lg block mb-2">
              Work Experience
            </label>
            {formData.experience.map((exp, i) => (
              <div key={i} className="border rounded-md p-3 mb-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) =>
                    handleSectionChange("experience", i, "title", e.target.value)
                  }
                  className="w-full border rounded-md p-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleSectionChange(
                      "experience",
                      i,
                      "company",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-md p-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Years"
                  value={exp.years}
                  onChange={(e) =>
                    handleSectionChange("experience", i, "years", e.target.value)
                  }
                  className="w-full border rounded-md p-2 mb-2"
                />
                <textarea
                  placeholder="Details"
                  value={exp.details}
                  onChange={(e) =>
                    handleSectionChange(
                      "experience",
                      i,
                      "details",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}
            <button
              onClick={() =>
                addSectionItem("experience", {
                  title: "",
                  company: "",
                  years: "",
                  details: "",
                })
              }
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Experience
            </button>
          </div>

          {/* Education */}
          <div className="mb-6">
            <label className="font-semibold text-lg block mb-2">
              Education
            </label>
            {formData.education.map((edu, i) => (
              <div key={i} className="border rounded-md p-3 mb-3">
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleSectionChange("education", i, "degree", e.target.value)
                  }
                  className="w-full border rounded-md p-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    handleSectionChange(
                      "education",
                      i,
                      "institution",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-md p-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) =>
                    handleSectionChange("education", i, "year", e.target.value)
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}
            <button
              onClick={() =>
                addSectionItem("education", {
                  degree: "",
                  institution: "",
                  year: "",
                })
              }
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Education
            </button>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="font-semibold text-lg block mb-2">
              Professional Skills
            </label>
            {formData.skills.map((s, i) => (
              <div key={i} className="border rounded-md p-3 mb-3">
                <input
                  type="text"
                  placeholder="Skill"
                  value={s.skill}
                  onChange={(e) =>
                    handleSectionChange("skills", i, "skill", e.target.value)
                  }
                  className="w-full border rounded-md p-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Level (e.g. Expert, Beginner)"
                  value={s.level}
                  onChange={(e) =>
                    handleSectionChange("skills", i, "level", e.target.value)
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}
            <button
              onClick={() =>
                addSectionItem("skills", { skill: "", level: "" })
              }
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Skill
            </button>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <label className="font-semibold text-lg block mb-2">
              Languages
            </label>
            {formData.languages.map((lang, i) => (
              <div key={i} className="border rounded-md p-3 mb-3">
                <input
                  type="text"
                  placeholder="Language"
                  value={lang.language}
                  onChange={(e) =>
                    handleSectionChange(
                      "languages",
                      i,
                      "language",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-md p-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Proficiency (Fluent, Basic)"
                  value={lang.level}
                  onChange={(e) =>
                    handleSectionChange("languages", i, "level", e.target.value)
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}
            <button
              onClick={() =>
                addSectionItem("languages", { language: "", level: "" })
              }
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Language
            </button>
          </div>

          {/* References */}
          <div className="mb-6">
            <label className="font-semibold text-lg block mb-2">
              References
            </label>
            {formData.references.map((ref, i) => (
              <div key={i} className="border rounded-md p-3 mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={ref.name}
                  onChange={(e) =>
                    handleSectionChange("references", i, "name", e.target.value)
                  }
                  className="w-full border rounded-md p-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Contact Info"
                  value={ref.contact}
                  onChange={(e) =>
                    handleSectionChange(
                      "references",
                      i,
                      "contact",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}
            <button
              onClick={() =>
                addSectionItem("references", { name: "", contact: "" })
              }
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Reference
            </button>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadResume}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Download PDF
          </button>
        </div>

        {/* ---------- LIVE PREVIEW ---------- */}
        <div
          ref={previewRef}
          className="bg-white p-8 shadow rounded-lg max-h-[90vh] overflow-y-auto"
        >
          <div className="flex gap-6">
            {/* Left Side */}
            <div className="w-1/3 border-r pr-4">
              {formData.photo && (
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="profile"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
              )}
              <h1 className="text-xl font-bold text-center">{formData.name}</h1>
              <p className="text-center text-gray-600 mb-4">
                {formData.profession}
              </p>

              <h2 className="font-semibold text-gray-700 mb-2">
                Contact Info
              </h2>
              <ul className="text-sm text-gray-600 mb-4">
                {formData.contact.map((c, i) => (
                  <li key={i}>
                    <b>{c.type}:</b> {c.value}
                  </li>
                ))}
              </ul>

              <h2 className="font-semibold text-gray-700 mb-2">Skills</h2>
              <ul className="text-sm text-gray-600 mb-4">
                {formData.skills.map((s, i) => (
                  <li key={i}>
                    {s.skill} - {s.level}
                  </li>
                ))}
              </ul>

              <h2 className="font-semibold text-gray-700 mb-2">Languages</h2>
              <ul className="text-sm text-gray-600">
                {formData.languages.map((l, i) => (
                  <li key={i}>
                    {l.language} ({l.level})
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side */}
            <div className="w-2/3 pl-4">
              <h2 className="text-lg font-semibold mb-2">About Me</h2>
              <p className="text-gray-700 mb-4 whitespace-pre-line">
                {formData.about}
              </p>

              <h2 className="text-lg font-semibold mb-2">Introduction</h2>
              <p className="text-gray-700 mb-4 whitespace-pre-line">
                {formData.introduction}
              </p>

              <h2 className="text-lg font-semibold mb-2">Experience</h2>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold">
                    {exp.title} — {exp.company}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">{exp.years}</p>
                  <p className="text-gray-700 whitespace-pre-line">
                    {exp.details}
                  </p>
                </div>
              ))}

              <h2 className="text-lg font-semibold mb-2">Education</h2>
              {formData.education.map((edu, i) => (
                <p key={i} className="text-gray-700">
                  {edu.degree}, {edu.institution} ({edu.year})
                </p>
              ))}

              <h2 className="text-lg font-semibold mt-4 mb-2">References</h2>
              {formData.references.map((ref, i) => (
                <p key={i} className="text-gray-700">
                  {ref.name} — {ref.contact}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2EditPage;
