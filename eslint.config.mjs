import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import * as ts from "typescript-eslint";

/**
 * @type {import("eslint").Linter.Config[]}
 */
export default [
    // ESLint recommended
    // https://github.com/eslint/eslint
    js.configs.recommended,

    // TypeScript ESLint recommended
    // https://github.com/typescript-eslint/typescript-eslint
    ...ts.configs.recommended,

    // eslint-plugin-import
    // https://github.com/import-js/eslint-plugin-import
    pluginImport.flatConfigs.recommended,
    pluginImport.flatConfigs.typescript,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: [
                // globals
                // https://github.com/sindresorhus/globals
                globals.es2023,
                globals.node,
                globals.nodeBuiltin,
            ],
        },
        settings: {
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"],
            },
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json",
                },
            },
        },
    },

    // eslint-plugin-unicorn
    // https://github.com/sindresorhus/eslint-plugin-unicorn
    pluginUnicorn.configs["flat/recommended"],

    // eslint-config-prettier
    // https://github.com/prettier/eslint-config-prettier
    prettier,

    // custom rules
    {
        rules: {
            "no-console": "error",

            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                },
            ],

            "import/order": [
                "error",
                {
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
                    "newlines-between": "always",
                },
            ],
        },
    },

    // ignore
    {
        ignores: ["node_modules", "dist"],
    },
];
