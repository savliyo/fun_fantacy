// Runs `husky install` for local/dev installs, but never fails the install
// itself — e.g. on a production deploy (Render, etc.) where NODE_ENV=production
// causes npm to skip devDependencies (husky included), or where there's no
// .git directory to hook into.
if (process.env.NODE_ENV === 'production') {
  console.log('Skipping husky install (NODE_ENV=production)');
} else {
  try {
    require('child_process').execSync('husky install', { stdio: 'inherit' });
  } catch (err) {
    console.log(`Skipping husky install: ${err.message}`);
  }
}
