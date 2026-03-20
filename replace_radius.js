const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Global regex to target all 4px border radii variations
      const regex1 = /border-radius:\s*4px/g;
      const regex2 = /border-radius:\s*2px/g;
      const regex3 = /border-bottom-left-radius:\s*4px/g;
      const regex4 = /border-bottom-right-radius:\s*4px/g;

      if (regex1.test(content) || regex2.test(content) || regex3.test(content) || regex4.test(content)) {
        content = content.replace(regex1, 'border-radius: 6px');
        content = content.replace(regex2, 'border-radius: 6px');
        content = content.replace(regex3, 'border-bottom-left-radius: 6px');
        content = content.replace(regex4, 'border-bottom-right-radius: 6px');
        changed = true;
      }
      
      // Top-only border radii edge case
      const regex5 = /border-radius:\s*4px\s*4px\s*0\s*0/g;
      if (regex5.test(content)) {
        content = content.replace(regex5, 'border-radius: 6px 6px 0 0');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'src'));
console.log('Done!');
