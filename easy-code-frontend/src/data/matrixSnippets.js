/**
 * matrixSnippets.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Code snippets used in the animated "Matrix rain" background on the login page.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const MATRIX_SNIPPETS = [
  "<div><h1>HELLO</h1></div>",
  "function(e){return true;}",
  ".class{color:#fff;margin:0;}",
  "const data=await fetch(url);",
  "if(user.auth){login();}",
  "body{display:flex;}",
  "<button onClick={click}>",
  "let x=Math.random();",
  "export default App;",
  "console.log('Matrix');",
  "SELECT * FROM users;",
  "@RestController",
  "public class User{",
  "import React from 'react';",
  "Array.prototype.map",
  "public void run(){}",
  "background:radial-gradient",
  "const [val,setVal]=useState",
  "module.exports=config;",
];

export function generateMatrixColumns(numCols) {
  const cols = [];
  for (let i = 0; i < numCols; i++) {
    const col = [];
    for (let j = 0; j < 8; j++) {
      col.push(MATRIX_SNIPPETS[Math.floor(Math.random() * MATRIX_SNIPPETS.length)]);
    }
    cols.push(col);
  }
  return cols;
}
