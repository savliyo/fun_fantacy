const { execSync } = require('child_process');

module.exports = isDryRun() ? getDryRunConfig() : getCIConfig();

function getDryRunConfig() {
  return {
    repositoryUrl: getLocalRepoUrl(),
    branches: getCurrentBranch(),
    generateNotes: '@semantic-release/release-notes-generator',
    plugins: [
      [
        '@semantic-release/commit-analyzer',
        {
          preset: 'angular',
          releaseRules: [
            { type: 'docs', scope: 'README', release: 'patch' },
            { type: 'refactor', release: 'patch' },
            { type: 'feat-sm', release: 'patch' },
            { type: 'style', release: 'patch' },
            { type: 'feat', release: 'minor' },
            { type: 'bug', release: 'patch' },
            { type: 'perf', release: 'patch' },
          ],
          parserOpts: {
            noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
          },
        },
      ],
      [
        '@semantic-release/release-notes-generator',
        {
          preset: 'conventionalcommits',
          presetConfig: {
            types: [
              {
                type: 'feat',
                section: ':sparkles: Features',
                hidden: false,
              },
              {
                type: 'fix',
                section: ':bug: Bug fixes',
                hidden: false,
              },
              {
                type: 'docs',
                section: ':memo: Documentation',
                hidden: false,
              },
              {
                type: 'refactor',
                section: ':zap: Refactor',
                hidden: false,
              },
              {
                type: 'perf',
                section: ':fast_forward: Performance Improvements',
                hidden: false,
              },
              {
                type: 'test',
                section: ':white_check_mark: Tests',
                hidden: false,
              },
              {
                type: 'ci',
                section: ':repeat: CI',
                hidden: false,
              },
              {
                type: 'misc',
                section: ':repeat: Misc',
                hidden: false,
              },
            ],
          },
        },
      ],
      '@semantic-release/changelog',
    ],
  };
}

function getCIConfig() {
  // contains your normal semantic-release config
  // this will be used on your CI environment
  return {
    repositoryUrl: 'https://github.com/vishal2457/funfantasy-monorepo',
    branches: ['main'],
    plugins: [
      [
        '@semantic-release/commit-analyzer',
        {
          preset: 'angular',
          releaseRules: [
            { type: 'docs', scope: 'README', release: 'patch' },
            { type: 'refactor', release: 'patch' },
            { type: 'feat-sm', release: 'patch' },
            { type: 'style', release: 'patch' },
            { type: 'feat', release: 'minor' },
            { type: 'bug', release: 'patch' },
            { type: 'perf', release: 'patch' },
          ],
          parserOpts: {
            noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
          },
        },
      ],
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      '@semantic-release/git',
      '@semantic-release/github',
    ],
  };
}

function isDryRun() {
  return process.argv.includes('--dry-run');
}

function getLocalRepoUrl() {
  const topLevelDir = execSync('git rev-parse --show-toplevel')
    .toString()
    .trim();

  return `file://${topLevelDir}/.git`;
}

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
