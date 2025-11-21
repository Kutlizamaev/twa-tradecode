import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['node_modules', 'public']),
    {
        files: ['**/*.{ts,tsx}'],

        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                project: false,
            },
        },

        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],

        rules: {
            'no-console': 'off',
            'no-debugger':
                process.env.NODE_ENV === 'production' ? 'error' : 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],

            '@typescript-eslint/no-explicit-any': 'off',

            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-empty-function': 'off',

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            'no-undef': 'off',
            'no-extra-boolean-cast': 'off',
        },
    },
])
