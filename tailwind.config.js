/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'slide-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0%)' },
        },
        'slide-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0%)' },
        },
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0%)' },
        },
        'slide-down': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0%)' },
        },
        'scale-x': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        'scale-y': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
        'sm-bounce': {
          '0%, 100%': {
            transform: 'translateY(-2px)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'rotate': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'scale-1': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'slide-left': 'slide-left 0.5s ease-in-out',
        'slide-right': 'slide-right 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-in-out',
        'slide-down': 'slide-down 0.5s ease-in-out',
        'scale-x': 'scale-x 1s ease',
        'scale-y': 'scale-y 1s ease',
        'bounce': 'sm-bounce 1s ease-in-out infinite',
        'rotate': 'rotate 0.5s linear',
        'scale-1': 'scale-1 1s ease',
      },
    },
  },
  plugins: [],
}

