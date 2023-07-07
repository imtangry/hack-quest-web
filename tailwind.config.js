/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false
  // },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        'next-book-bold': ['NEXT Book Bold'],
        'next-book': ['NEXT Book'],
        'next-book-Thin': ['NEXT Book Thin'],
        'next-poster-Bold': ['NEXT Poster Bold'],
        'next-poster': ['NEXT Poster'],
        'next-poster-Thin': ['NEXT Poster Thin'],
        'neuemachina-light': ['Neue Machina Light'],
        neuemachina: ['Neue Machina']
      },
      screens: {
        xs: '480px',

        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1352px'
        // => @media (min-width: 1352px) { ... }
      }
    }
  },
  plugins: []
};
