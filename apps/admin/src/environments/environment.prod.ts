export const environment = {
  production: true,
  api: '@API_URL@',
  get assetsURL() {
    return `${this.api}/static`;
  },
  latestBuildTime: '@LAST_BUILD_TIME@',
};
