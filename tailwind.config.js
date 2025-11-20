/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                valorant: {
                    red: '#FF4655',
                    dark: '#0F1923',
                    white: '#ECE8E1',
                    gray: '#768079',
                }
            },
            fontFamily: {
                sans: ['Rajdhani', 'sans-serif'],
                heading: ['Oswald', 'sans-serif'],
                mono: ['"Share Tech Mono"', 'monospace'],
            },
            backgroundImage: {
                'valorant-gradient': 'linear-gradient(135deg, #FF4655 0%, #0F1923 100%)',
            }
        },
    },
    plugins: [],
}
