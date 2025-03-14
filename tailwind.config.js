module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'primary': '#586159',      // muted green/gray
        'secondary': '#626265',    // medium gray
        'accent': '#A6685B',       // terracotta/rust
        'background': '#E5E5DD',   // cream/off-white
        'dark': '#171D26',         // dark navy blue
        'light': '#AEB0A9',        // light gray-green
      }
    },
  },
  plugins: [],
}
