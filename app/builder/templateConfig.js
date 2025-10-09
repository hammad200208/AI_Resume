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

  // ✨ Template 2 — Updated Two-Column Modern Template
  2: {
    name: "Modern Template",
    layout: "two-column",
    previewStyle: "modern",

    left: [
      { key: "photo", label: "Profile Photo", type: "file" },
      { key: "name", label: "Full Name", type: "text" },
      { key: "profession", label: "Profession", type: "text" },

      {
        key: "contact",
        label: "Contact Info",
        type: "section",
        multiple: true,
        fields: [
          { key: "type", label: "Type (e.g. Email, Phone)", type: "text" },
          { key: "value", label: "Value", type: "text" },
        ],
      },
    ],

    right: [
      { key: "about", label: "About Me", type: "textarea" },
      { key: "introduction", label: "Resume Introduction", type: "textarea" },

      {
        key: "experience",
        label: "Work Experience",
        type: "section",
        multiple: true,
        fields: [
          { key: "title", label: "Job Title", type: "text" },
          { key: "company", label: "Company", type: "text" },
          { key: "years", label: "Years", type: "text" },
          { key: "details", label: "Details", type: "textarea" },
        ],
      },

      {
        key: "education_proskill",
        label: "Education & Professional Skills",
        type: "group",
        columns: 2,
        fields: [
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
          {
            key: "skills",
            label: "Professional Skills",
            type: "section",
            multiple: true,
            fields: [
              { key: "skill", label: "Skill Name", type: "text" },
              { key: "level", label: "Skill Level", type: "text" },
            ],
          },
        ],
      },

      {
        key: "language_reference",
        label: "Languages & References",
        type: "group",
        columns: 2,
        fields: [
          {
            key: "languages",
            label: "Languages",
            type: "section",
            multiple: true,
            fields: [
              { key: "language", label: "Language", type: "text" },
              { key: "level", label: "Proficiency", type: "text" },
            ],
          },
          {
            key: "references",
            label: "References",
            type: "section",
            multiple: true,
            fields: [
              { key: "name", label: "Name", type: "text" },
              { key: "contact", label: "Contact Info", type: "text" },
            ],
          },
        ],
      },
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
