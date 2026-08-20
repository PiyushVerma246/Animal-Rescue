const fs = require('fs');
const path = require('path');

const win1252Reverse = {
  0x80: '\u20AC', 0x82: '\u201A', 0x83: '\u0192', 0x84: '\u201E',
  0x85: '\u2026', 0x86: '\u2020', 0x87: '\u2021', 0x88: '\u02C6',
  0x89: '\u2030', 0x8A: '\u0160', 0x8B: '\u2039', 0x8C: '\u0152',
  0x8E: '\u017D', 0x91: '\u2018', 0x92: '\u2019', 0x93: '\u201C',
  0x94: '\u201D', 0x95: '\u2022', 0x96: '\u2013', 0x97: '\u2014',
  0x98: '\u02DC', 0x99: '\u2122', 0x9A: '\u0161', 0x9B: '\u203A',
  0x9C: '\u0153', 0x9E: '\u017E', 0x9F: '\u0178'
};

const charToByte = {};
for (let i = 0xA0; i <= 0xFF; i++) {
  charToByte[String.fromCharCode(i)] = i;
}
for (let [b, c] of Object.entries(win1252Reverse)) {
  charToByte[c] = parseInt(b);
}
[0x81, 0x8D, 0x8F, 0x90, 0x9D].forEach(b => {
  charToByte[String.fromCharCode(b)] = b;
});

// To be safe against matching single characters, we require at least 2 characters.
// Mojibake for UTF-8 is always 2+ bytes.
const chars = Object.keys(charToByte).join('').replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
const regex = new RegExp(`[${chars}]{2,8}`, 'g');

function fixMojibake(str) {
  return str.replace(regex, (match) => {
    let bytes = [];
    for (let i = 0; i < match.length; i++) {
      bytes.push(charToByte[match[i]]);
    }
    const decoded = Buffer.from(bytes).toString('utf8');
    // If it perfectly decodes without replacement characters and makes sense (is shorter), we use it.
    // Why shorter? 4 mojibake chars (e.g. ðŸ ¾) decode to 2 JS characters (surrogate pair for emoji).
    // 2 mojibake chars decode to 1 JS character.
    if (!decoded.includes('\uFFFD') && decoded.length < match.length) {
      return decoded;
    }
    // Try sub-matching if there was a greedy match that included valid trailing chars
    // e.g. "ðŸ ¾ " (paw + space) space is not in charset, but what if there's a trailing 'A0' (nbsp)?
    // A more complex parser could do this, but the regex only matches chars in the corrupted set.
    return match; 
  });
}

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
      results = results.concat(walkDir(filePath));
    } else if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walkDir('d:/AniCure/frontend');

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  let fixed = fixMojibake(content);
  
  if (fixed !== original) {
    fs.writeFileSync(file, fixed, 'utf8');
    console.log('Fixed mojibake in:', file);
    count++;
  }
}
console.log('Total files fixed:', count);
