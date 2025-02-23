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
                'tia-azureish-white': '#DAE3E9',
            },
            fontFamily: {
                chango: ['Chango', 'sans-serif'],
                roboto: ['var(--font-roboto)'],
                instrument: ['Instrument Serif', 'serif'],
                nunitosans: ['Nunito Sans', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
