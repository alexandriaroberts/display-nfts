export const theme = {
  fonts: {
    body: 'Noto Serif, serif',
    heading: 'Lora, Noto-serif',
  },
  colors: {
    text: '#223A31',
    background: '#ffffff',
    primary: '#F18019',
    secondaryOrange: '#FF9A19',
  },
  breakpoints: ['641px', '749px', '1024px', '1288px'],
  styles: {
    root: {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
        position: 'relative', // Make absolutely positioned elements relative to their parent by default
        margin: 0,
        minWidth: 0, // Prevent flex items from overflowing horizontally
        minHeight: 0, // Prevent flex items from overflowing vertically
        padding: 0,
        border: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        backgroundPosition: 'center center', // Normally defaults to 0% 0%
        backgroundRepeat: 'no-repeat', // Normally defaults to `repeat`
      },
    },
  },
};
