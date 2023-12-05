import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        17.5: "70px",
        10.5: "43px",
        30: "120px",
        60: "240px",
        100: "400px",
        110: "440px",
        125: "500px",
      },
    },
  },
  plugins: [],
} satisfies Config;
