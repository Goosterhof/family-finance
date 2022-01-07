/* eslint-env node */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    globals: {
        '@vue/vue3-jest': {
            babelConfig: true,
        },
    },
    testEnvironment: 'jsdom',
    verbose: true,
    moduleFileExtensions: [
        'js',
        'ts',
        'json',
        // tell Jest to handle `*.vue` files
        'vue',
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/js/component/mocks/imgMock.js',
    },
    moduleDirectories: ['node_modules', 'resources/js'],
    transform: {
        // process `*.vue` files with `vue-jest`
        '.*\\.(vue)$': '@vue/vue3-jest',
        '^.+\\.js$': 'babel-jest',
        // process `*.ts` files with `ts-jest`
        '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    setupFiles: ['./tests/js/component/setup.js'],

    // testMatch: ['**/tests/component/**/*.spec.js'],
};

export default config;
