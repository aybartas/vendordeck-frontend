export function getInitialProductParams() {
  return {
    page: 0,
    size: 6,
    sort: {
      sortBy: "name",
      ascending: true,
    },
  };
}
