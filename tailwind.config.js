/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#202D66",
        "navy-strong": "#16224F",
        pink: "#F8CDDA",
        "pink-strong": "#F2BACB",
        card: "#FFFFFF",
        muted: "#5B5C63",
        line: "rgba(29, 43, 100, 0.14)",
        shadow: "rgba(20, 24, 51, 0.24)",
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      screens: {
        mob: { max: "600px" },
        "mob-short": { raw: "(max-width: 600px) and (max-height: 700px)" },
      },
    },
  },
  plugins: [],
};
