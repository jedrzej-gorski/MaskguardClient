module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "react/jsx-props-no-spreading": "warn",
    "react/no-array-index-key": "warn",
  },
};
