// Import the Config type from Tailwind CSS
import type { Config } from "tailwindcss";

// Define the Tailwind CSS configuration
const config: Config = {
  // Specify the paths to all of the template files in the project
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the pages directory
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the components directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the app directory
  ],
  // Extend the default theme
  theme: {
    extend: {
      // Add custom colors
      colors: {
        background: "var(--background)", // Use CSS variables for background color
        foreground: "var(--foreground)", // Use CSS variables for foreground color
      },
    },
  },
  // Specify any plugins to use
  plugins: [],
};

// Export the configuration as the default export
export default config;
