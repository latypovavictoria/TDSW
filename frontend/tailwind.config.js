/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./layouts/**/*.tsx",
    "./blocks/**/*.tsx",
    "./utils/**/*.tsx",
  ],
  darkMode: ["class", "[data-mode='dark']"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#002b34",
          alternate: "#001f2a",
          active: "#000a17",
        },

        primary: "#4dffff",
        alternate: "#18a7a7",
      },
    },
  },
  plugins: [],
};
