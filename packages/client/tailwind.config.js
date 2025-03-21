module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // adjust as necessary for your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',      // Add a custom color named 'primary'
        theme_dark: '#333', // Orange for to-do items
        todo: '#ff9900', // Orange for to-do items
        progress: '#0099ff', // Blue for items in progress
        completed: '#00cc66', // Green for completed items
      }
    },
  },
  plugins: [],
}
