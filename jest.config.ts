import type { Config } from 'jest';


const config: Config = {
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
    testEnvironment           : 'jsdom',
    coveragePathIgnorePatterns: [
        'index.ts',
    ],
};

export default config;
