import fs from 'fs';
import path from 'path';

function copyAssetsTo(destDir) {
  const target = path.resolve(destDir);
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = ['index.html', 'style.css', 'main.js', 'app.js'];
  for (const file of files) {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(target, file));
    }
  }
}

copyAssetsTo('dist');
copyAssetsTo('public');

console.log('Build completed successfully: assets copied to dist/ and public/');
