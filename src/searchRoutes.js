const searchRoutes = (routes, searchTerm) => {
  const results = [];

  const search = (route, basePath = '') => {
    const fullPath = basePath + (route.path || '');
    if (route.name && route.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push({ name: route.name, path: fullPath });
    }
    if (route.children) {
      route.children.forEach(childRoute => search(childRoute, fullPath));
    }
  };

  routes.forEach(route => search(route));

  return results;

};

export default searchRoutes;
