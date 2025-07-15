const fs = require("fs");
const path = require("path");

function findFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findFiles(fullPath, files);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".js") || entry.name.endsWith(".ts"))
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const emptyParam = /\/:(['"`\s])/g;
  const matches = content.match(emptyParam);
  if (matches) {
    console.log(`\n⚠️  Paramètre vide détecté dans : ${filePath}`);
  }

  const httpRoute = /['"`]https?:\/\/[^'"`]+['"`]/g;
  const matches2 = content.match(httpRoute);
  if (matches2) {
    console.log(`\n⚠️  Route complète détectée dans : ${filePath}`);
    matches2.forEach((m) => console.log("  👉", m));
  }
}

const files = findFiles(path.resolve(__dirname));

files.forEach(scanFile);
