/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0A0F1C',
                surface: 'rgba(255, 255, 255, 0.05)',
                primary: {
                    DEFAULT: '#F59E0B',
                    dark: '#D97706',
                },
                secondary: '#3B82F6',
                success: '#10B981',
                danger: '#F43F5E',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
