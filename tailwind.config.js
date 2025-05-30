/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        DEFAULT: "1px 1px 2px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
