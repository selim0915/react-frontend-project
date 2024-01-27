module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": { "jsx": true }
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "prettier"
    ],
    "plugins": [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "prettier", 
    ],
    "rules": {
        "prettier/prettier": [
            "error", {
                // "singleQuote": true,
                // "jsxSingleQuote": true
            }
        ]
    }
}
