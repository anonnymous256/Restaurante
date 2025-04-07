module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(@firebase|firebase))'
    ],
    moduleFileExtensions: ['js', 'jsx'],
    testEnvironment: 'node'
};
