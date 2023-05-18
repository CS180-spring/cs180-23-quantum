module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    // enable dark mode via class strategy
    darkMode: 'class',

    theme: {
        extend: {
            colors: {
                black: '#09090c',
                darkGray: '#121212',

                medBlue: 'hsl(203, 85%, 54%)',
                brightRed: 'hsl(12, 88%, 59%)',
                brightRedLight: 'hsl(12, 88%, 69%)',
                brightRedSupLight: 'hsl(12, 88%, 95%)',
                offWhite: 'hsl(45, 29%, 97%)',
                darkPurple: 'hsl(262, 39%, 33%)',
            },
            height: {
                '128': '32rem',
                '144': '36rem',
                '160': '40rem',
                '176': '44rem',
                '192': '48rem',
              }
        },
    },
    plugins: [require("daisyui")],
}
