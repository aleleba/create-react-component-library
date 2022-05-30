module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es2021': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': ['react', '@typescript-eslint'],
  'rules': {
    'indent': ['error', 'tab'],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/no-var-requires': 0
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
};