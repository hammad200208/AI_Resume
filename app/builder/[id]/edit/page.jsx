"use client";

import { useParams } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { templates } from "../../templateConfig";

export default function EditBuilderPage() {
  const { id } = useParams();
  const template = templates[id];
  const [formData, setFormData] = useState({});
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageToCrop, setImageToCrop] = useState(null);
  const cropCanvasRef = useRef(null);

  // ----------------------------
  // Helpers for updating formData
  // ----------------------------
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // for simple arrays (string arrays)
  const handleMultipleChange = (key, index, value) => {
    const arr = [...(formData[key] || [])];
    arr[index] = value;
    handleChange(key, arr);
  };

  // top-level addMore: chooses between string vs object default
  const addMore = (key) => {
    const current = formData[key] || [];
    const newItem = current.length > 0 && typeof current[0] === "object" ? {} : "";
    handleChange(key, [...current, newItem]);
  };

  const removeItem = (key, index) => {
    const arr = [...(formData[key] || [])];
    arr.splice(index, 1);
    handleChange(key, arr);
  };

  // -------------
  // Group helpers
  // -------------
  // Ensure group object exists (like formData.education_proskill = { education: [], skills: [] })
  const ensureGroup = (groupKey) => {
    const group = formData[groupKey] || {};
    return group;
  };

  const handleGroupSectionChange = (groupKey, subKey, index, subFieldKey, value) => {
    const group = { ...(formData[groupKey] || {}) };
    const arr = [...(group[subKey] || [])];
    arr[index] = { ...(arr[index] || {}), [subFieldKey]: value };
    group[subKey] = arr;
    handleChange(groupKey, group);
  };

  const addMoreGroup = (groupKey, subKey) => {
    const group = { ...(formData[groupKey] || {}) };
    const arr = [...(group[subKey] || [])];
    const newItem = {};
    arr.push(newItem);
    group[subKey] = arr;
    handleChange(groupKey, group);
  };

  const removeGroupItem = (groupKey, subKey, index) => {
    const group = { ...(formData[groupKey] || {}) };
    const arr = [...(group[subKey] || [])];
    arr.splice(index, 1);
    group[subKey] = arr;
    handleChange(groupKey, group);
  };

  // -------------
  // Image upload + crop
  // -------------
  const handleImageSelect = (fieldKey, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageToCrop(e.target.result);
      setCropping(true);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      handleChange("_cropField", fieldKey);
    };
    reader.readAsDataURL(file);
  };

  const saveCrop = () => {
    // save the cropped "imageToCrop" to the selected field key
    handleChange(formData._cropField, imageToCrop);
    setCropping(false);
  };

  // -------------
  // PDF Download
  // -------------
  const downloadResume = async () => {
    const resumeElement = document.getElementById("resume-preview");
    if (!resumeElement) return alert("Nothing to export");

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

  // ----------------------------
  // Render field (supports types: text, textarea, file,
  // section (repeatable objects), group (named nested sections),
  // and simple multiple arrays)
  // ----------------------------
  const renderField = (field) => {
    // PRIORITIZE structured types
    if (field.type === "section") {
      // section: multiple repeatable object entries (e.g. experience)
      const sectionData = formData[field.key] || [];

      const handleSectionChange = (index, subKey, value) => {
        const updated = [...sectionData];
        updated[index] = { ...(updated[index] || {}), [subKey]: value };
        handleChange(field.key, updated);
      };

      const addSectionItem = () => {
        // create object entry
        const updated = [...sectionData, {}];
        handleChange(field.key, updated);
      };

      return (
        <div key={field.key} className="mb-6 text-left">
          <label className="block font-medium mb-2 text-gray-700">{field.label}</label>
          {sectionData.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3 space-y-2">
              {field.fields.map((subField) => (
                <div key={subField.key} className="">
                  <label className="block text-sm font-medium mb-1 text-gray-600">
                    {subField.label}
                  </label>
                  {subField.type === "textarea" ? (
                    <textarea
                      rows={2}
                      value={item[subField.key] || ""}
                      onChange={(e) => handleSectionChange(index, subField.key, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                    />
                  ) : (
                    <input
                      type={subField.type}
                      value={item[subField.key] || ""}
                      onChange={(e) => handleSectionChange(index, subField.key, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                    />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => removeItem(field.key, index)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSectionItem}
            className="text-blue-600 text-sm hover:underline"
          >
            + Add More
          </button>
        </div>
      );
    }

    if (field.type === "group") {
      // group: object of named subsections (each subsection often is a section)
      const groupData = formData[field.key] || {};

      return (
        <div key={field.key} className="mb-6 text-left">
          <label className="block font-medium mb-2 text-gray-700">{field.label}</label>
          <div className={`grid grid-cols-${field.columns || 2} gap-4`}>
            {field.fields.map((subSection) => (
              <div key={subSection.key} className="bg-white">
                <h4 className="font-semibold text-gray-700 mb-2">{subSection.label}</h4>

                {/* render the subsection (expected to be type 'section') */}
                <div>
                  {(groupData[subSection.key] || []).map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 mb-3 space-y-2">
                      {subSection.fields.map((subField) => (
                        <div key={subField.key}>
                          <label className="block text-sm font-medium mb-1 text-gray-600">
                            {subField.label}
                          </label>
                          {subField.type === "textarea" ? (
                            <textarea
                              rows={2}
                              value={(item && item[subField.key]) || ""}
                              onChange={(e) =>
                                handleGroupSectionChange(field.key, subSection.key, index, subField.key, e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                            />
                          ) : (
                            <input
                              type={subField.type}
                              value={(item && item[subField.key]) || ""}
                              onChange={(e) =>
                                handleGroupSectionChange(field.key, subSection.key, index, subField.key, e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                            />
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => removeGroupItem(field.key, subSection.key, index)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addMoreGroup(field.key, subSection.key)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    + Add More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // -----------------------------------------------------------------
    // simple "multiple" arrays of strings (legacy/simple usage)
    // -----------------------------------------------------------------
    if (field.multiple) {
      const value = formData[field.key] || [""];
      return (
        <div key={field.key} className="mb-4 text-left">
          <label className="block font-medium mb-1 text-gray-700">{field.label}</label>
          {value.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type={field.type || "text"}
                value={item}
                onChange={(e) => handleMultipleChange(field.key, index, e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeItem(field.key, index)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              // try to keep type consistent: if first element exists and is object -> push {}
              const curr = formData[field.key] || [];
              const newItem = curr.length > 0 && typeof curr[0] === "object" ? {} : "";
              handleChange(field.key, [...curr, newItem]);
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add More
          </button>
        </div>
      );
    }

    // -----------------------------------------------------------------
    // file input
    // -----------------------------------------------------------------
    if (field.type === "file") {
      return (
        <div key={field.key} className="mb-4 text-left">
          <label className="block font-medium mb-1 text-gray-700">{field.label}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageSelect(field.key, e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
      );
    }

    // -----------------------------------------------------------------
    // textarea
    // -----------------------------------------------------------------
    if (field.type === "textarea") {
      const value = formData[field.key] || "";
      return (
        <div key={field.key} className="mb-4 text-left">
          <label className="block font-medium mb-1 text-gray-700">{field.label}</label>
          <textarea
            rows={3}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    }

    // -----------------------------------------------------------------
    // default input (text / number / email, etc.)
    // -----------------------------------------------------------------
    const value = formData[field.key] || "";
    return (
      <div key={field.key} className="mb-4 text-left">
        <label className="block font-medium mb-1 text-gray-700">{field.label}</label>
        <input
          type={field.type || "text"}
          value={value}
          onChange={(e) => handleChange(field.key, e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  };

  // ----------------------------
  // Template 2 Preview (modern)
  // ----------------------------
  const renderTemplate2Preview = () => (
    <div
      id="resume-preview"
      className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row"
    >
      {/* LEFT COLUMN */}
      <div className="w-full md:w-1/3 bg-gray-100 p-6 space-y-4 text-center">
        {formData.photo && (
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src={formData.photo}
              alt="Profile"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {formData.name && <h2 className="text-2xl font-bold">{formData.name}</h2>}
        {formData.profession && <p className="text-blue-600 font-medium">{formData.profession}</p>}

        {Array.isArray(formData.contact) && formData.contact.length > 0 && (
          <div className="text-left">
            <h3 className="font-semibold text-gray-700 mb-1">Contact</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {formData.contact.map((c, i) => (
                // contact items could be objects with { type, value } or simple strings
                <li key={i}>
                  {typeof c === "string" ? c : `${c.type}: ${c.value}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full md:w-2/3 p-6 space-y-6">
        {formData.about && (
          <section>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-1">About Me</h3>
            <p className="text-sm text-gray-600">{formData.about}</p>
          </section>
        )}

        {formData.introduction && (
          <section>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-1">Resume Introduction</h3>
            <p className="text-sm text-gray-600">{formData.introduction}</p>
          </section>
        )}

        {/* Work Experience */}
        {Array.isArray(formData.experience) && formData.experience.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-1">Work Experience</h3>
            {formData.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium text-sm">
                  {exp.title || ""}{exp.title && exp.company ? " - " : ""}{exp.company || ""}
                </p>
                {exp.years && <p className="text-xs text-gray-500">{exp.years}</p>}
                {exp.details && <p className="text-sm text-gray-600">{exp.details}</p>}
                {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education & Skills */}
        {(formData.education_proskill?.education?.length > 0 || formData.education_proskill?.skills?.length > 0) && (
          <section>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Education & Professional Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Education</h4>
                {formData.education_proskill?.education?.map((edu, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {edu.degree || ""}{edu.degree && edu.institution ? " - " : ""}{edu.institution || ""}
                  </p>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Skills</h4>
                {formData.education_proskill?.skills?.map((s, i) => (
                  <p key={i} className="text-sm text-gray-600">{s.skill || ""}{s.level ? ` (${s.level})` : ""}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Languages & References */}
        {(formData.language_reference?.languages?.length > 0 || formData.language_reference?.references?.length > 0) && (
          <section>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Languages & References</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Languages</h4>
                {formData.language_reference?.languages?.map((l, i) => (
                  <p key={i} className="text-sm text-gray-600">{l.language || ""}{l.level ? ` (${l.level})` : ""}</p>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">References</h4>
                {formData.language_reference?.references?.map((r, i) => (
                  <p key={i} className="text-sm text-gray-600">{r.name || ""}{r.contact ? ` - ${r.contact}` : ""}</p>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );

  // ----------------------------
  // Render page
  // ----------------------------
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Customize Your {template?.name}</h2>
          {template?.left && template?.right ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Left Section</h3>
                {template.left.map(renderField)}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Right Section</h3>
                {template.right.map(renderField)}
              </div>
            </div>
          ) : (
            template?.fields?.map(renderField)
          )}

          <button
            onClick={downloadResume}
            className="mt-6 w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
          >
            Download Resume
          </button>
        </div>

        {/* PREVIEW */}
        <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-y-auto max-h-[90vh]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Live Preview ({template?.previewStyle})
          </h2>
          {template?.previewStyle === "modern" ? renderTemplate2Preview() : <p>Preview not available</p>}
        </div>
      </div>

      {/* CROPPER MODAL */}
      {cropping && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-96 h-96 relative">
            <Cropper
              image={imageToCrop}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
            <button
              onClick={saveCrop}
              className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => setCropping(false)}
              className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
