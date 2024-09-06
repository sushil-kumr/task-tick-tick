module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(woff|woff2|eot|ttf|otf)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!some-esm-package|another-package)/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
