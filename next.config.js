module.exports = {
  target: "serverless",
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
    };
  },
};
