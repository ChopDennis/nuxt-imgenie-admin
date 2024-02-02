/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    backdropBlur: {
      sm: "2px",
    },
    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      boxShadow: {
        "custom-md":
          "0px 5px 12px 4px rgba(0, 0, 0, 0.09), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px -2px rgba(0, 0, 0, 0.16)",
        "custom-lg":
          "0px 9px 28px 8px rgba(0, 0, 0, 0.09), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)",
      },
      spacing: {
        110: "110px",
      },
    },
  },
  plugins: [],
};
