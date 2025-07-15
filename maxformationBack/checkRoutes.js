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

function checkRouteString(str) {
  // Cherche un paramètre vide /: ou une url http(s) complète
  if (/:\/?(\W|$)/.test(str)) {
    return true;
  }
  if (/https?:\/\//.test(str)) {
    return true;
  }
  return false;
}

function scanRoutesInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const routeStrings = [...content.matchAll(/(['"`])([^'"`]*?)\1/g)];
  let found = [];
  for (const m of routeStrings) {
    const str = m[2];
    if (checkRouteString(str)) {
      found.push(str);
    }
  }
  return found;
}

const projectDir = __dirname;
const files = findFiles(projectDir);

let suspiciousRoutes = [];

for (const file of files) {
  const found = scanRoutesInFile(file);
  if (found.length > 0) {
    suspiciousRoutes.push({ file, routes: found });
  }
}

if (suspiciousRoutes.length === 0) {
  console.log("Aucune route suspecte détectée.");
} else {
  for (const entry of suspiciousRoutes) {
    console.log(`\nFichier: ${entry.file}`);
    entry.routes.forEach((r) => console.log("  Route suspecte:", r));
  }
}
