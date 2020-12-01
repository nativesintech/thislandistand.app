module.exports = {
  target: "severless",
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
    };
  },
};
