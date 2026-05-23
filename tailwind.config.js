/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette (LakshRise)
        ink: "#070B1A", // deep background / dark navy
        primary: "#7B2EFF", // neon purple
        ember: "#FF7A18", // accent orange
        whiteText: "#FFFFFF",
        uiGray: "#B8BCC8",
        plum: "#7c3aed",
        mint: "#ccfbf1"
      },
      boxShadow: {
        lift: "0 24px 70px rgba(17, 24, 39, 0.14)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
