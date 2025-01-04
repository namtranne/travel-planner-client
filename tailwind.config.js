/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : 'media',
    content: ['./src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'system-ui'], // Default Inter font
                'inter-italic': ['Inter-Italic', 'system-ui'] // Italic variant
            }
        }
    },
    plugins: []
};
