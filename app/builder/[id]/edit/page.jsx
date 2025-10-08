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

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleMultipleChange = (key, index, value) => {
    const arr = [...(formData[key] || [])];
    arr[index] = value;
    handleChange(key, arr);
  };

  const addMore = (key) => {
    handleChange(key, [...(formData[key] || [""]), ""]);
  };

  const removeItem = (key, index) => {
    const arr = [...(formData[key] || [])];
    arr.splice(index, 1);
    handleChange(key, arr);
  };

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
    handleChange(formData._cropField, imageToCrop);
    setCropping(false);
  };

  const downloadResume = async () => {
    const resumeElement = document.getElementById("resume-preview");
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

  const renderField = (field) => {
    const value = formData[field.key] || (field.multiple ? [""] : "");

    if (field.multiple) {
      return (
        <div key={field.key} className="mb-4 text-left">
          <label className="block font-medium mb-1 text-gray-700">{field.label}</label>
          {value.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              {field.type === "textarea" ? (
                <textarea
                  rows={2}
                  value={item}
                  onChange={(e) => handleMultipleChange(field.key, index, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type={field.type}
                  value={item}
                  onChange={(e) => handleMultipleChange(field.key, index, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                />
              )}
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
            onClick={() => addMore(field.key)}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add More
          </button>
        </div>
      );
    }

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

    if (field.type === "textarea") {
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

    return (
      <div key={field.key} className="mb-4 text-left">
        <label className="block font-medium mb-1 text-gray-700">{field.label}</label>
        <input
          type={field.type}
          value={value}
          onChange={(e) => handleChange(field.key, e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  };

  const renderTemplate1Preview = () => (
    <div
      id="resume-preview"
      className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row p-6 space-y-4"
    >
      <div className="w-full md:w-1/3 bg-gray-100 p-4 space-y-4">
        {formData.photo && (
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
            <Image src={formData.photo} alt="Profile" width={128} height={128} className="object-cover w-full h-full" />
          </div>
        )}
        {formData.name && <h2 className="text-2xl font-bold text-center">{formData.name}</h2>}
        {formData.profession && <p className="text-center text-blue-600 font-medium">{formData.profession}</p>}
        {formData.about && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">About Me</h3>
            <p className="text-sm text-gray-600">{formData.about}</p>
          </div>
        )}
        {Array.isArray(formData.education) && formData.education.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Education</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {formData.education.map((edu, idx) => (
                <li key={idx}>{edu}</li>
              ))}
            </ul>
          </div>
        )}
        {Array.isArray(formData.contact) && formData.contact.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Contact</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {formData.contact.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full md:w-2/3 p-4 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Work Experience</h3>
        {Array.isArray(formData.experience) && formData.experience.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-700">
            {formData.experience.map((exp, idx) => (
              <li key={idx}>{exp}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic text-sm">Add your work experience...</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Customize Your {template.name}</h2>
          {template.left && template.right ? (
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
            template.fields?.map(renderField)
          )}
          <button
            onClick={downloadResume}
            className="mt-6 w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
          >
            Download Resume
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Live Preview ({template.previewStyle})
          </h2>
          {renderTemplate1Preview()}
        </div>
      </div>

      {/* Cropping Modal */}
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
