import { JestConfigWithTsJest } from 'ts-jest';

const esModules = [].join('|');

export default {
  preset: 'ts-jest/presets/default-esm',
  transform: {
    [`^.+.ts?$`]: ['ts-jest', { useESM: true }],
  },
  testEnvironment: 'node',
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  testTimeout: 20000,
} as JestConfigWithTsJest;
