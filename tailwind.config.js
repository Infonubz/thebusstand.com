let dynamicColors = {
  primary: '#48A1E4',
  background: '#CEDFEF',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        primary: dynamicColors.background, // Orange
        background: dynamicColors.background, // Black
      },
      backgroundImage: {
        // "custom-gradient-luxury":
        //   "linear-gradient(to right, #F8C550, #FFEB76, #FFE173)",
        "custom-gradient-luxury":
          "linear-gradient(to right, #F8C550, #FFEB76, #FFE173)",
        "custom-gradient": "linear-gradient(135deg, #F8F8F8 0%, #E7EBEE 100%)",
      },
    },
    variants: {
      extend: {
        fill: ["hover", "focus"], // Add fill variants if needed
      },
    },
    fontFamily: {
      sans: ["Lato"],
      // sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
