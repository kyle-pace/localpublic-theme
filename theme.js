import { readFileSync, writeFileSync } from 'fs';

// Read package.json
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

// Read default.hbs
const content = readFileSync('default.hbs', 'utf8');

// Replace or add the data-theme attribute
const updatedContent = content.replace(
  /<html([^>]*)>/,
  `<html$1 data-theme="${packageJson.name} v${packageJson.version}">`
);

// Write back to default.hbs
writeFileSync('default.hbs', updatedContent);