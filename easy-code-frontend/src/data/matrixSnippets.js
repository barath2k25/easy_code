/**
 * matrixSnippets.js — Rich code/binary/hex/keyword rain for splash background
 */

export const MATRIX_SNIPPETS = [
  // Binary strings
  '01001000 01100101', '10110100 11001010', '00110101 10011011',
  '11001010 00110101', '01110110 10001101', '10001111 01110010',
  '00101010 11101001', '11110001 00101100', '01010101 10101010',
  '10100011 01011100', '00011110 11100011', '11000111 00011000',
  // Hex values
  '0xFF3366',  '0x6366F1',  '0xA855F7',  '0x06B6D4',
  '0x030712',  '0xF8FAFC',  '0x1F2937',  '0xEC4899',
  '#6366f1',   '#a855f7',   '#06b6d4',   '#f8fafc',
  // Numbers / math
  '3.14159265', '2.71828182', '1.61803398', '0.57721566',
  '42 | 1337',  '255 | 0',    '16 | 32 | 64', '512 | 1024',
  // Code snippets
  'const x = 42;',
  'let fn = () => {};',
  'async function f(){}',
  'import React from "r"',
  'export default App;',
  'useState(false)',
  'useEffect(()=>{})',
  '.map(x => x * 2)',
  '.filter(Boolean)',
  'JSON.stringify(obj)',
  'Promise.resolve()',
  'try { run() }',
  'catch(e){log(e)}',
  'return null;',
  'typeof undefined',
  // CSS
  'display:flex;',
  'position:absolute',
  'border-radius:8px',
  'background:linear',
  'transform:scale()',
  'opacity:0.85;',
  // HTML tags
  '<div class="app">',
  '</section>',
  '<canvas id="c">',
  '<script defer>',
  // Keywords
  'class', 'extends', 'interface', 'implements',
  'public', 'private', 'static', 'void',
  'int', 'string', 'boolean', 'float',
  'null', 'true', 'false', 'NaN',
  'if', 'else', 'while', 'for',
  'break', 'continue', 'return',
  // Symbols / operators
  '=> {} && ||', '=== !== >= <=',
  '++ -- ** ??', '... | & ^ ~',
];

export function generateMatrixColumns(numCols) {
  const cols = [];
  for (let i = 0; i < numCols; i++) {
    const col = [];
    const lineCount = 10 + Math.floor(Math.random() * 8); // 10-18 lines per column
    for (let j = 0; j < lineCount; j++) {
      col.push(MATRIX_SNIPPETS[Math.floor(Math.random() * MATRIX_SNIPPETS.length)]);
    }
    cols.push(col);
  }
  return cols;
}
