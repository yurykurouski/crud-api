module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "plugins": ["simple-import-sort", "unused-imports"],
    "extends": ["eslint:recommended", "plugin:n/recommended"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": 0,
        semi: 1,
        "simple-import-sort/imports": 2,
        "simple-import-sort/exports": 2,
        "unused-imports/no-unused-imports": "error",
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
    }
};
