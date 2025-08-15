module.exports = {
  root: true,
  extends: ["airbnb", "airbnb/hooks", "airbnb-base/legacy", "airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./services/*/tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh"],
  rules: {
    "no-console": "warn",
    "no-debugger": "error",
    "prefer-const": "error",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "import/no-extraneous-dependencies": "off",
    "no-floating-promises": "off",
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-void": "off",
    "react-refresh/only-export-components": ["warn"],
    "comma-dangle": "off",
    "react/jsx-one-expression-per-line": "off",
    "operator-linebreak": "off",
  },
  overrides: [
    {
      files: [".eslintrc.js", "**/*.config.js", "**/*.config.cjs"],
      parser: "espree",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
    },
  ],
};
