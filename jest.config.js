const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const aliases = pathsToModuleNameMapper(compilerOptions.paths, {
	prefix: '<rootDir>'
});
   
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '\\.cy.(js|jsx|ts|tsx)$'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    ...aliases,
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|sass|scss|less)$': 'identity-obj-proxy'
  },
};