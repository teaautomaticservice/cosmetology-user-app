const isIterableObject = (entity) => 
  entity != null && typeof entity === 'object' && !(entity instanceof RegExp) && !(entity instanceof Date);

const rewriteLoader = (targetEntity, callback) => {
  const recursiveIterator = (item) => {
    for (const key in item) {
      const value = item[key];
      if (isIterableObject(value)) {
        recursiveIterator(value);
      } else {
        callback(item, key);
      }
    }
    return true;
  };
  return recursiveIterator(targetEntity);
};

module.exports = rewriteLoader;