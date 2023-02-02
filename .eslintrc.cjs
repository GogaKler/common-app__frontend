/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    root: true,
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
    env: {
        browser: true,
        amd: true,
        node: true
    },
    globals: {
        __APP__CLIENT__DOMAIN__: true,
        __APP__SERVER__DOMAIN__: true
    },
    rules: {
        'no-console': isProd ? 'warn' : 'off',
        'no-debugger': isProd ? 'warn' : 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                trailingComma: 'none',
                printWidth: 100,
                tabWidth: 4,
                useTabs: false
            }
        ],
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION',
                    'LIST_RENDERING',
                    'CONDITIONALS',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    ['UNIQUE', 'SLOT'],
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'OTHER_ATTR',
                    'EVENTS',
                    'CONTENT'
                ]
            }
        ],
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'generator-star-spacing': [
            'error',
            {
                before: true,
                after: false
            }
        ],
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true
            }
        ],
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-duplicate-imports': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'object-shorthand': ['error', 'always'],
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: true
            }
        ],
        'prefer-const': 'error',
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true
                }
            }
        ],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'rest-spread-spacing': ['error', 'never'],
        'template-curly-spacing': ['error', 'never'],
        'yield-star-spacing': [
            'error',
            {
                before: true,
                after: false
            }
        ]
    },
    parserOptions: {
        ecmaVersion: 'latest'
    }
};
