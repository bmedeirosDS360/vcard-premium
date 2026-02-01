/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ds: {
                    green: '#00382E', // Unified DS Logo Green (Deep Forest)
                    gold: '#C5A059',
                    dark: '#001A15',  // Studio Dark (Near Black Green)
                    'gold-light': '#D4AF37'
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
                cinzel: ['Cinzel', 'serif'],
            },
            animation: {
                'sway': 'sway 3s ease-in-out infinite',
                'pulse-gold': 'pulse-gold 2s infinite',
            },
            keyframes: {
                sway: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                'pulse-gold': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(197, 160, 89, 0.7)' },
                    '50%': { boxShadow: '0 0 0 15px rgba(197, 160, 89, 0)' },
                }
            },
            dropShadow: {
                'gold': '0 0 10px rgba(197, 160, 89, 0.5)',
            }
        },
    },
    plugins: [],
}
