/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}', // This tells Tailwind to scan your app folder
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'), // <-- ADD THIS LINE
    ],
}