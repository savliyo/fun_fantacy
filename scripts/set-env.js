const { writeFile, readFile } = require('fs');
const { resolve } = require('path');

const targetPath = resolve(
  __dirname,
  '../apps/admin/src/environments/environment.prod.ts'
);

const options = {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const formatter = new Intl.DateTimeFormat([], options);
const indianTime = formatter.format(new Date());

const envs = {
  api: process.env.API_URL || `https://server.funfantasy11.com`,
  latestBuildTime: indianTime,
};

const replaceEnv = (char, replacement, result) => {
  const regex = new RegExp(char, 'g');
  result = result.replace(regex, replacement);
  return result;
};

readFile(targetPath, 'utf-8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }
  let result = data;
  result = replaceEnv('@API_URL@', envs.api, result);
  result = replaceEnv('@LAST_BUILD_TIME@', envs.latestBuildTime, result);

  writeFile(targetPath, result, 'utf-8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Environment variables written to ${targetPath}`);
    }
  });
});
