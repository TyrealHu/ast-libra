import{parse as o}from"acorn";import{ancestor as n}from"acorn-walk";n(o("\nimport b from './test.js'\nexport const a = 1\nexport default function() {\n  console.log(11111)\n}\n",{ecmaVersion:"latest",sourceType:"module"}),{ExportDefaultDeclaration:(o,n)=>{console.log(o),console.log(n)}});
//# sourceMappingURL=index.modern.js.map
