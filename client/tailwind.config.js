/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        accent: "#33c3a5",
        line: "rgba(148, 163, 184, 0.18)"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(19, 184, 166, 0.16)"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"]
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};
