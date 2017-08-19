module.exports = {
  extends: 'airbnb-base',
  env: {
    jest: true,
  },
  plugins: ['import', 'classes'],
  globals: { atom: true },
  rules: {
    'no-console': 'off',
    'classes/style': 2,
    'classes/super': 2,
    'classes/name': [2, 'class', 'method'],
    'classes/space': 2,
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/core-modules': ['atom'],
  },
};
