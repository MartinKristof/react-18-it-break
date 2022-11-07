module.exports = {
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['build', 'coverage', 'chart', 'public'],
  extends: [
    'react-app',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['promise', 'prettier', 'simple-import-sort', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'react/jsx-props-no-spreading': 0,
    'prettier/prettier': ['error'],
    'import/prefer-default-export': [1],
    'import/no-named-as-default': [0],
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/href-no-hash': [0],
    'react/no-array-index-key': 0,
    'react/prop-types': [0],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/require-default-props': [1, { ignoreFunctionalComponents: true }],
    'prefer-arrow-callback': [1],
    'newline-before-return': [1],
    eqeqeq: ['warn', 'smart'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    '@typescript-eslint/indent': [0],
    'arrow-body-style': ['error', 'as-needed'],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'simple-import-sort/imports': [
      1,
      {
        groups: [
          // React packages
          ['^react'],
          // External packages
          ['^@?\\w'],
          // Internal packages.
          ['^(@)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'import/first': 1,
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
