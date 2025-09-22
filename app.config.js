export default {
  expo: {
    name: "FloraLink",
    slug: "flora-link",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.ashannuwantha.floralink",
    },
    extra: {
      eas: {
        projectId: "5547ed37-cf13-4a94-856f-75f03acd46ba",
      },
    },
  },
};
