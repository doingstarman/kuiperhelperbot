import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        accent: '#22D3EE'
      },
      boxShadow: {
        neumorphic: '10px 10px 30px rgba(15, 23, 42, 0.35), -10px -10px 30px rgba(255, 255, 255, 0.08)'
      }
    }
  },
  plugins: [],
};

export default config;
