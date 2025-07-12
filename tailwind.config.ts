// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)', 'Raleway', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#293a2c', // Tmavě zelená
        'brand-light': '#f0f2ef', // Světle šedozelená
      }
    },
  },
  plugins: [],
};
export default config;
