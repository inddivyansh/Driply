const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'app', '(landing-sections)');

// Get all JSX files in the landing-sections directory
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(sectionsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove filter blur with comma after
  content = content.replace(/, filter: 'blur\(\d+px\)'/g, '');
  
  // Remove filter blur with comma before
  content = content.replace(/filter: 'blur\(\d+px\)', /g, '');
  
  // Remove standalone filter blur
  content = content.replace(/filter: 'blur\(\d+px\)'/g, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated ${file}`);
});

console.log(`\n✅ Removed blur effects from ${files.length} files`);
