const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    "postcss-preset-env": {
      stage: 1,
      features: {
        "oklch-function": false, // disable oklch()
        "color-function": false, // disable color-mix()
      },
    },
  },
};

export default config;
