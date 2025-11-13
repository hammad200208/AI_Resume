"use client";

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Template2EditPage = () => {
  const [formData, setFormData] = useState({
    image: "",
    fullName: "",
    jobTitle: "",
    aboutMe: "",
    skills: "",
    languages: "",
    email: "",
    phone: "",
    address: "",
  });

  const [experienceList, setExperienceList] = useState([""]);
  const [educationList, setEducationList] = useState([""]);
  const [loading, setLoading] = useState(false);

  const previewRef = useRef(null);

  // -------------------- Input Handlers --------------------
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // -------------------- Experience --------------------
  const handleExperienceChange = (index, value) => {
    const list = [...experienceList];
    list[index] = value;
    setExperienceList(list);
  };
  const addExperience = () => setExperienceList([...experienceList, ""]);
  const removeExperience = (index) => {
    const list = [...experienceList];
    list.splice(index, 1);
    setExperienceList(list);
  };

  // -------------------- Education --------------------
  const handleEducationChange = (index, value) => {
    const list = [...educationList];
    list[index] = value;
    setEducationList(list);
  };
  const addEducation = () => setEducationList([...educationList, ""]);
  const removeEducation = (index) => {
    const list = [...educationList];
    list.splice(index, 1);
    setEducationList(list);
  };

  // -------------------- PDF Download --------------------
  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");
  };

  // -------------------- AI Resume Generator --------------------
  const handleGenerateAI = async () => {
    const prompt = `
You are a resume writing assistant.
Using the following user-provided details, generate a concise, professional "About Me" paragraph (max 80 words).
It should sound confident, clear, and relevant to a resume.

Full Name: ${formData.fullName || "N/A"}
Job Title: ${formData.jobTitle || "N/A"}
Skills: ${formData.skills || "N/A"}
Languages: ${formData.languages || "N/A"}
Experience: ${experienceList.join(", ") || "N/A"}
Education: ${educationList.join(", ") || "N/A"}
Email: ${formData.email || "N/A"}
Phone: ${formData.phone || "N/A"}
Address: ${formData.address || "N/A"}

Write it in first-person but without starting with "I am" every time. Keep it formal and brief.
`;

    try {
      setLoading(true);
      const response = await fetch("https://resumenbackend.vercel.app/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate AI summary");

      const data = await response.json();
      const cleanText = data.text
        ?.replace(/^["'\s]*(Here.*?:\s*)?/i, "")
        ?.replace(/^["']|["']$/g, "")
        ?.trim();

      setFormData((prev) => ({
        ...prev,
        aboutMe: cleanText || prev.aboutMe,
      }));
    } catch (err) {
      console.error(err);
      alert("Error generating AI summary.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* LEFT PANEL (Form) */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#21141a]">Edit Resume</h2>

        {/* Upload Image */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* About Me */}
        <div className="mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">About Me</label>
          <textarea
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* ✅ AI Button */}
        <div className="mt-4">
          <button
            onClick={handleGenerateAI}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate About Me with AI"}
          </button>
        </div>

        {/* Skills & Languages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Languages (comma separated)
            </label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#21141a] mb-2">Experience</h3>
          {experienceList.map((exp, index) => (
            <div key={index} className="flex items-center mb-2 gap-2">
              <textarea
                value={exp}
                onChange={(e) => handleExperienceChange(index, e.target.value)}
                placeholder="Enter experience details"
                rows="2"
                className="w-full border p-2 rounded"
              />
              {experienceList.length > 1 && (
                <button
                  onClick={() => removeExperience(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addExperience}
            className="mt-2 text-sm text-white bg-[#21141a] px-3 py-1 rounded"
          >
            ➕ Add More
          </button>
        </div>

        {/* Education */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#21141a] mb-2">Education</h3>
          {educationList.map((edu, index) => (
            <div key={index} className="flex items-center mb-2 gap-2">
              <textarea
                value={edu}
                onChange={(e) => handleEducationChange(index, e.target.value)}
                placeholder="Enter education details"
                rows="2"
                className="w-full border p-2 rounded"
              />
              {educationList.length > 1 && (
                <button
                  onClick={() => removeEducation(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addEducation}
            className="mt-2 text-sm text-white bg-[#21141a] px-3 py-1 rounded"
          >
            ➕ Add More
          </button>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadPDF}
          className="mt-6 bg-[#21141a] text-white px-6 py-2 rounded hover:bg-[#3a2330] transition"
        >
          Download PDF
        </button>
      </div>

      {/* RIGHT PANEL (Preview) */}
      <div
        ref={previewRef}
        className="bg-white p-0 shadow rounded-lg max-h-[90vh] overflow-y-auto w-full md:w-1/2"
      >
        <div className="flex min-h-full">
          {/* LEFT SIDE */}
          <div className="w-1/3 bg-[#21141a] text-white p-6 flex flex-col items-start">
            {formData.image && (
              <img
                src={formData.image}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-[#f4c542]"
              />
            )}

            {/* About Me */}
            {formData.aboutMe && (
              <div className="mb-6">
                <h2 className="font-semibold text-[#f4c542] mb-2 text-lg">About Me</h2>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {formData.aboutMe}
                </p>
              </div>
            )}

            {/* Skills */}
            {formData.skills && (
              <div className="mb-6">
                <h2 className="font-semibold text-[#f4c542] mb-2 text-lg">Skills</h2>
                <ul className="list-disc list-inside text-gray-200 text-sm space-y-1">
                  {formData.skills.split(",").map((skill, index) => (
                    <li key={index}>{skill.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {formData.languages && (
              <div>
                <h2 className="font-semibold text-[#f4c542] mb-2 text-lg">Languages</h2>
                <ul className="list-disc list-inside text-gray-200 text-sm space-y-1">
                  {formData.languages.split(",").map((lang, index) => (
                    <li key={index}>{lang.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-2/3 pl-8 bg-white text-black p-6">
            {formData.fullName && (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.fullName}</h1>
            )}
            {formData.jobTitle && (
              <h2 className="text-lg text-gray-700 font-medium mb-6">{formData.jobTitle}</h2>
            )}
            {(formData.email || formData.phone || formData.address) && (
              <div className="mb-6">
                <h2 className="font-semibold text-[#21141a] mb-2">Contact Info</h2>
                <ul className="text-gray-700 text-sm space-y-1">
                  {formData.email && <li>Email: {formData.email}</li>}
                  {formData.phone && <li>Phone: {formData.phone}</li>}
                  {formData.address && <li>Address: {formData.address}</li>}
                </ul>
              </div>
            )}
            {experienceList.length > 0 && (
              <div className="mb-6">
                <h2 className="font-semibold text-[#21141a] mb-2">Experience</h2>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {experienceList.map((exp, index) => exp && <li key={index}>{exp}</li>)}
                </ul>
              </div>
            )}
            {educationList.length > 0 && (
              <div>
                <h2 className="font-semibold text-[#21141a] mb-2">Education</h2>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {educationList.map((edu, index) => edu && <li key={index}>{edu}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2EditPage;
