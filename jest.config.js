const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/services/**/*.{js,jsx,ts,tsx}',
    'src/lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 25,
      lines: 50,
    },

    'lib/api/client.ts': {
      statements: 90,
      branches: 80,
      functions: 60,
      lines: 95,
    },
    'services/auth.service.ts': {
      statements: 65,
      branches: 30,
      functions: 70,
      lines: 65,
    },
  },
};

module.exports = createJestConfig(config);
