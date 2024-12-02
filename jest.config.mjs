export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/js/tests/setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/js/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};