const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.html') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = [...walk('./src'), './index.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace NAY-B with NAY-BE
  content = content.replace(/NAY-B/g, 'NAY-BE');
  // Replace NAYB with NAYBE
  content = content.replace(/NAYB(?![a-zA-Z])/g, 'NAYBE');
  // Replace NayB with NayBe (excluding if it's already NayBe or NayBGlobalLogo to prevent component rename issues, wait let's just rename the component references as well)
  // Actually, we can just replace 'NayB' with 'NayBe' but be careful not to make 'NayBee'.
  content = content.replace(/NayB(?![eE])/g, 'NayBe');
  
  // Replace emails
  content = content.replace(/naybglobal/g, 'naybeglobal');
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log("Replaced strings successfully.");