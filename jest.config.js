module.exports  = {
    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['./node_modules', './src/TypeScript/src'],
    // A list of paths to directories that Jest should use to search for files in
    roots: ['./__test__/unit', './src/TypeScript'],
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(Spec|test).ts?(x)'],
    transform: {
        '^.*ts$': 'ts-jest'
    },
    moduleNameMapper: {
        '^N/(.*)': '<rootDir>/node_modules/@hitc/netsuite-types/N/$1',
        '^n/(.*)': '<rootDir>/src/TypeScript/types/n/$1'
    },
    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['./node_modules', './src/TypeScript/src'],
    // An array of file extensions your modules use
    moduleFileExtensions: ['ts', 'js', 'json', 'node', 'd.ts'],
    verbose: false,
    transformIgnorePatterns: ['node_modules/(?!(@hitc))'],
    restoreMocks: true
}
