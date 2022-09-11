var o=require("acorn");require("acorn-walk").ancestor(o.parse("\nimport b from './test.js'\nexport const a = 1\nexport default function() {\n  console.log(11111)\n}\n",{ecmaVersion:"latest",sourceType:"module"}),{ExportDefaultDeclaration:function(o,e){console.log(o),console.log(e)}});
//# sourceMappingURL=index.js.map
