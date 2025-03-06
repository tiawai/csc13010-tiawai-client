import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            fontFamily: {
                chango: ['Chango', 'sans-serif'],
                roboto: ['var(--font-roboto)'],
                instrument: ['Instrument Serif', 'serif'],
                nunitosans: ['Nunito Sans', 'serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            backgroundColor: {
                primary: '#E9DAE9',
                secondary: '#DAE3E9',
            },
            textColor: {
                primary: '#4D2C5E',
                secondary: '#2C2F5E',
            },
        },
    },
    plugins: [],
};
export default config;
