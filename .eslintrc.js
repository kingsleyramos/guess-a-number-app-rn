/* eslint-disable no-tabs */
module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'prettier',
    ],
    rules: {
        indent: ['error', 'tab'],
        'react/jsx-filename-extension': [1, {
            extensions: ['.js', '.jsx']
        }],
    },
};