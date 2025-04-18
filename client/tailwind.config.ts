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
                'tia-platinum': '#E9DAE9',
                'tia-platinum-2': '#DBE3E9',
                'tia-azureish-white': '#DAE3E9',
                'tia-jacarta': '#4D2C5E',
                'tia-deep-koamaru': '#373A66',
                'tia-slate-blue': '#5D62D0',
                'tia-alice-blue': '#EDF6FF',
            },
            fontFamily: {
                chango: ['var(--font-chango)'],
                roboto: ['var(--font-roboto)'],
                instrument: ['Instrument Serif', 'serif'],
                nunitosans: ['Nunito Sans', 'serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            backgroundColor: {
                primary: '#E9DAE9',
                secondary: '#DAE3E9',
                'primary-button': '#4D2C5E',
                'secondary-button': '#2C2F5E',
            },
            borderColor: {
                'primary-button': '#4D2C5E',
                'secondary-button': '#2C2F5E',
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
