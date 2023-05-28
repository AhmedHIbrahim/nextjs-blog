/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,

      env: {
        mongodb_username: "nasa-api",
        mongodb_password: "vWYBUkqDQhVKY5Hm",
        mongodb_clustername: "nasacluster",
        mongodb_database: "nextjs", // <--
        AUTH_SECRET:"myauthsecret"
      },
    };
  }
  return {
    reactStrictMode: true,
    
    env: {
      mongodb_username: "nasa-api",
      mongodb_password: "vWYBUkqDQhVKY5Hm",
      mongodb_clustername: "nasacluster",
      mongodb_database: "nextjs",
      AUTH_SECRET:"myauthsecret"
    },
  };
};

module.exports = nextConfig;
