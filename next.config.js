require("dotenv").config();

module.exports = {
  env: {
    localIP: process.env.localIP,
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
    };
  },
};
