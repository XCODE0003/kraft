
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],
    important: true,
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '980px',
            xl: '1215px',
        },
        extend: {
            colors: {
                purple: '#6341BA',
                purple_1: '#7D58D9',
                purple_2: '#7645EF',
                gray_icon: '#4B4951',
                light_gray: '#E9E9E9',
                light_gray_2: '#F7F7F7',
                dark: '#2B2B2B',
                red: '#FD1A1A',
                border_gray: '#DDDDDD',
            },
        },
    },

};
