# Theme color Generator

## Generation color palette from common colors

### For usage

```
const palette = {
  primary: "#1b4d89",
  success: "#6db784",
  warning: "#f9e45b",
};

const path = require("node:path");
const fs = require("node:fs");

const vars = generator(palette);
async function write(vars) {
  try {
    const filepath = path.join(process.cwd(), "vars.css");
    const content = `
:root {
  ${vars.join("\n")}
}
      `;
    fs.writeFileSync(filepath, content, "utf8");
  } catch (err) {
    console.log(err);
  }
}

write(vars);
```
