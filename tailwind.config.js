const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],
    mode: 'jit',
    theme: {
        extend: {
            fontFamily: {
                // sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                gray: colors.blueGray,
                orange: colors.orange,
            },
            container: {
                center: 'true',
                padding: '1rem',
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
