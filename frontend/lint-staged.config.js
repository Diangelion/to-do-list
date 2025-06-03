export default {
  '*.{js,jsx,ts,tsx}': [
    () => 'tsc --noEmit --project tsconfig.json', // Ensure tsconfig is explicitly used
    'eslint --fix --max-warnings=0 --no-warn-ignored',
    'prettier --write',
  ],
  // Optional: Format other relevant file types like JSON, Markdown, CSS/SCSS.
  '*.{json,md,html,css,scss}': ['prettier --write'],
}
