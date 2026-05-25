const fs = require('fs');
const path = require('path');

const map = {
  '#2a1510': '#e8e2d6',
  '#2e2720': '#f5f0e8',
  '#3a2f26': '#ebe4d8',
  '#3d3028': '#e0d8cc',
  '#52443a': '#c4b49e',
  '#e8ddd0': '#2a221c',
  '#c4b49e': '#52443a',
  '#8a3324': '#a04030',
  '#a85a44': '#b85c48',
  '#6fa58a': '#3d7a5c',
  '#4d8a6e': '#2d6b52',
  '#d4a84b': '#9a7010',
  '#e8c87a': '#b8860b',
  '#7aafc4': '#3a6a8a',
  '#5c8fa8': '#2d5a72',
  '#8fbe6e': '#4a8a3a',
};

const umberPath = path.join(__dirname, '../themes/fine-art-umber.json');
const chalkPath = path.join(__dirname, '../themes/fine-art-chalk.json');

let s = fs.readFileSync(umberPath, 'utf8');
s = s.replace(
  /Fine Art Code – "Umber" Dark Theme[\s\S]*?════\n\n/,
  'Fine Art Code – "Chalk" Light Theme\n  //\n  //  Warm paper ground with ink text; syntax mirrors Umber roles.\n  //\n  // ════════════════════════════════════════════════════════════════\n\n'
);
s = s.replace('Fine Art Code – Umber', 'Fine Art Code – Chalk');
s = s.replace('"type": "dark"', '"type": "light"');

const entries = Object.entries(map);
entries.forEach(([from], i) => {
  s = s.split(from).join(`@@C${i}@@`);
  s = s.split(from.toUpperCase()).join(`@@C${i}@@`);
});
entries.forEach(([, to], i) => {
  s = s.split(`@@C${i}@@`).join(to);
});

fs.writeFileSync(chalkPath, s);
console.log('Wrote', chalkPath);
