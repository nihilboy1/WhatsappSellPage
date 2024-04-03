/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "whats-pattern":
          "url('https://i.pinimg.com/564x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
