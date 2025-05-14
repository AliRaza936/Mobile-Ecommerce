/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': {'max': '638px'},   // Custom breakpoint name
      'xsp': {'max': '470px'},   // Custom breakpoint name
      'sm':'639px',  // Default Tailwind
      'md': '768px',
      'lg': '1024px',
      'nlg': '1080px',
      'hlg': '1180px',
      'xl': '1280px',
      '2xl': '1536px',
      'tab': '560px',  // Your custom 560px breakpoint
      'bigtab': '950px' // Your custom 950px breakpoint
    },
    extend: {},
  },
  plugins: [],
}

