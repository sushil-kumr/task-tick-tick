module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
      testEnvironment: "jest-environment-jsdom",
      transform: {
      "^.+\\.jsx?$": "babel-jest", // Transforms JavaScript and JSX files using Babel
      },
      moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy", // Mock CSS imports
      },testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
      
      moduleDirectories: ["node_modules", "src"], // Allow absolute imports from ‘src’
  };