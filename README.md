# Engineering Calculator

A modern engineering calculator web application built with React, TypeScript, and Vite. This calculator supports basic arithmetic operations, keyboard input, dark/light mode toggle, and a calculation history feature.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Dark/light mode toggle with system preference detection
- Calculation history with individual entry deletion
- Keyboard input support
- Responsive design with consistent button layout

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/engineering-calculator.git
cd engineering-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

When you push changes to the `main` branch, GitHub Actions will automatically build and deploy the application to GitHub Pages.

### Manual Deployment

You can also deploy manually using the following command:

```bash
npm run deploy
```

This will build the application and deploy it to the `gh-pages` branch of your repository.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
