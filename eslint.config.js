import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "quotes": ["error", "double"],
      "jsx-quotes": ["error", "prefer-double"],
      "semi": [2, "always"],
      "eol-last": ["error", "always"],
      "no-console": 1,
      "no-extra-semi": 2,
      "semi-spacing": [2, { "before": false, "after": true }],
      "no-dupe-else-if": 0,
      "no-setter-return": 0,
      "prefer-promise-reject-errors": 0,
      "react/button-has-type": 2,
      "react/default-props-match-prop-types": 2,
      "react/react-in-jsx-scope": 0,
      "react/jsx-closing-bracket-location": 2,
      "react/jsx-closing-tag-location": 2,
      "react/jsx-curly-spacing": 2,
      "react/jsx-curly-newline": 2,
      "react/jsx-equals-spacing": 2,
      "react/jsx-max-props-per-line": [2, { "maximum": 1, "when": "multiline" }],
      "react/jsx-first-prop-new-line": 2,
      "react/jsx-curly-brace-presence": [
        2,
        { "props": "never", "children": "never" }
      ],
      "react/jsx-pascal-case": 2,
      "react/jsx-props-no-multi-spaces": 2,
      "react/jsx-tag-spacing": [2, { "beforeClosing": "never" }],
      "react/jsx-wrap-multilines": 2,
      "react/no-array-index-key": 2,
      "react/no-typos": 2,
      "react/no-unsafe": 2,
      "react/no-unused-prop-types": 2,
      "react/no-unused-state": 2,
      "react/self-closing-comp": 2,
      "react/sort-comp": 2,
      "react/style-prop-object": 2,
      "react/void-dom-elements-no-children": 2,
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn"
    },
  },
];
