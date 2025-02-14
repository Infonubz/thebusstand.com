let dynamicColors = {
  primary: "#48A1E4",
  background: "#CEDFEF",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        "scroll-loop": "scroll-loop 10s linear infinite",
      },
      keyframes: {
        "scroll-loop": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        primary: dynamicColors.background, // Orange
        background: dynamicColors.background, // Black
        "moss-gray": "#6B6D71", // Define the custom color
      },
      backgroundImage: {
        // "custom-gradient-luxury":
        //   "linear-gradient(to right, #F8C550, #FFEB76, #FFE173)",
        // "custom-gradient-luxury":
        //   "linear-gradient(to right, #F8C550, #FFEB76, #FFE173)",
        "custom-gradient-luxury":
          "linear-gradient(135.34deg, #F6B642 15.43%, #FFF279 38.03%, #FFDF71 69.97%, #FBE67B 86.26%)",
        "custom-gradient": "linear-gradient(135deg, #F8F8F8 0%, #E7EBEE 100%)",
        "luxury-custom-gradient-silver":
          "linear-gradient(187.95deg, #E3E3E3 2.28%, #EAEFF3 19.8%, #E3E3E3 32.94%, #FFFFFF 80.16%, #DEDEDE 62.15%, #E3E3E3 78.69%, #E3E3E3 95.24%)",
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
