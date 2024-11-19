import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        liferayGrey: '#EFEFEF',
        liferayGreen: '#66DF26',
        liferayBlue: '#0B63CE',
      },
    },
  },
  plugins: [],
} satisfies Config;
