module.exports = {
  root: true,
  extends: [
    '@coxy/eslint-config/react',
  ],
  rules: {
    'react-hooks/exhaustive-deps': [0],
    'comma-dangle': ['error', 'always-multiline'],
    'filename-rules/match': [0],
    'no-console': [0],
  },
}
