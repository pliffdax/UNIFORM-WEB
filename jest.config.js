const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/', '/tests/integration/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 25,
      lines: 50,
    },

    'src/lib/api/client.ts': {
      statements: 90,
      branches: 80,
      functions: 60,
      lines: 95,
    },
    'src/services/auth.service.ts': {
      statements: 65,
      branches: 30,
      functions: 70,
      lines: 65,
    },
  },
};

module.exports = createJestConfig(config);
