import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import path from "path";
import { fileURLToPath } from "url";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";
import stylistic from "@stylistic/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const flatCompat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  // 1. Ignore rules
  {
    ignores: [".idea/", ".vscode/", "**/dist/", "**/node_modules/"],
  },

  // 2. JS/TS base rules
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // 3. Airbnb + TypeScript + React
  ...fixupConfigRules(flatCompat.extends("airbnb")),
  ...flatCompat.extends("airbnb-typescript"),
  ...flatCompat.extends("airbnb/hooks"),

  // 4. React rules with plugins
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    // plugins omitted to avoid duplication error
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "@stylistic/indent": ["error", 2],
    },
  },

  // 5. Common settings (merged parserOptions)
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "@/shared/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  // 6. Disable warnings in eslint.config.js itself
  {
    files: ["eslint.config.js"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },

  // 7. Disable type-check rules in JS files
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },

  // 8. Prettier formatting rules
  prettier,
);
