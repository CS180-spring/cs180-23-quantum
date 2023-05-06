module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    // enable dark mode via class strategy
    darkMode: 'class',

    theme: {
        extend: {
            colors: {
                black: '#09090c',
                darkGray: '#121212',

                brightRed: 'hsl(12, 88%, 59%)',
                brightRedLight: 'hsl(12, 88%, 69%)',
                brightRedSupLight: 'hsl(12, 88%, 95%)',
                
                darkPurple: 'hsl(262, 39%, 33%)',
            },
        },
    },
    plugins: [require("daisyui")],
}
