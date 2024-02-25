/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EC5252", // Primary Brand Color
        secondary: "#CACBCC", // Secondary Brand Color
        background: "#f3f4f6", // Background Color
        "accent-1": "#1c1d1f", // Accent Color 1
        "accent-2": "#f9f9f9", // Accent Color 2
        text: "#333333", // Text Color (Optional)
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
