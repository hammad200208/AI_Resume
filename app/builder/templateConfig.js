export const templates = {
  1: {
    name: "Professional Template",
    layout: "two-column",
    previewStyle: "classic",

    left: [
      { key: "photo", label: "Profile Photo", type: "file" },
      { key: "name", label: "Full Name", type: "text" },
      { key: "profession", label: "Profession", type: "text" },
      { key: "about", label: "About Me", type: "textarea" },

      // 🎓 Education Section (multiple entries allowed)
      {
        key: "education",
        label: "Education",
        type: "section",
        multiple: true,
        fields: [
          { key: "degree", label: "Degree", type: "text" },
          { key: "institution", label: "Institution", type: "text" },
          { key: "year", label: "Year", type: "text" },
        ],
      },

      // 📞 Contact Section (multiple entries allowed)
      {
        key: "contact",
        label: "Contact",
        type: "section",
        multiple: true,
        fields: [
          { key: "email", label: "Email", type: "text" },
          { key: "phone", label: "Phone", type: "text" },
          { key: "address", label: "Address", type: "text" },
        ],
      },
    ],

    right: [
      // 💼 Work Experience Repeater (multiple by default)
      {
        key: "experience",
        label: "Work Experience",
        type: "repeater",
        multiple: true,
        itemFields: [
          { key: "title", label: "Job Title", type: "text" },
          { key: "company", label: "Company", type: "text" },
          { key: "years", label: "Years", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },

  2: {
    name: "Modern Template",
    previewStyle: "modern",
    fields: [
      { key: "photo", label: "Profile Photo", type: "file" },
      { key: "name", label: "Full Name", type: "text" },
      { key: "role", label: "Job Title", type: "text" },
      { key: "projects", label: "Projects", type: "textarea" },
      { key: "skills", label: "Skills", type: "textarea" },
    ],
  },

  3: {
    name: "Minimal Template",
    previewStyle: "minimal",
    fields: [
      { key: "name", label: "Full Name", type: "text" },
      { key: "summary", label: "Professional Summary", type: "textarea" },
      { key: "skills", label: "Key Skills", type: "textarea" },
    ],
  },
};
