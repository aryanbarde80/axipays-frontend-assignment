/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Satoshi'", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#111827",
        mist: "#eef2ff",
        brand: {
          50: "#eef8ff",
          100: "#d8ebff",
          500: "#1784ff",
          600: "#0b6ad4",
          700: "#0a4d99"
        },
        success: "#0f9d67",
        warning: "#d97706",
        danger: "#d92d20"
      },
      boxShadow: {
        card: "0 24px 80px rgba(15, 23, 42, 0.08)",
        glow: "0 16px 40px rgba(23, 132, 255, 0.16)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(23,132,255,0.18), transparent 36%), radial-gradient(circle at bottom right, rgba(15,157,103,0.16), transparent 32%)"
      }
    }
  },
  plugins: []
};
