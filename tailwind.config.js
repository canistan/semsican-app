/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'sans-medium': ['Inter-Medium', 'sans-serif'],
        'sans-semibold': ['Inter-SemiBold', 'sans-serif'],
        'sans-bold': ['Inter-Bold', 'sans-serif'],
        display: ['SpaceGrotesk', 'sans-serif'],
        'display-bold': ['SpaceGrotesk-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
