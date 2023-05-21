/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,

      env: {
        mongodb_username: "nasa-api",
        mongodb_password: "e4DmlUgLn5hIcSlE",
        mongodb_clustername: "nasacluster",
        mongodb_database: "nextjs-dev", // <--
      },
    };
  }
  return {
    reactStrictMode: true,

    env: {
      mongodb_username: "nasa-api",
      mongodb_password: "e4DmlUgLn5hIcSlE",
      mongodb_clustername: "nasacluster",
      mongodb_database: "nextjs",
    },
  };
};

module.exports = nextConfig;
