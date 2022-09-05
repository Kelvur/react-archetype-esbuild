
interface JestConfig {
    transform: Record<string, string>,
    testEnvironment: string,
}


const config: JestConfig = {
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
    testEnvironment: 'jsdom',
};

export default config;
