/**
 * uniq arr
 *
 * @param {Array} arr
 */
const uniq = arr => arr.filter((item, index) => index === arr.lastIndexOf(item));

/**
 * get new entries
 *
 * @param {Object} entries
 * @param {Array} polyfills
 * @param {String} entryChunkName the entry chunk name
 */
const getNewEntries = (entries, polyfills, entryChunkName) =>
  Object.assign(entries, {
    [entryChunkName]: uniq([].concat(polyfills, entries[entryChunkName] || [])),
  });

/**
 * why default entry chunk name is `main.js` ?
 *
 * see:
 * https://github.com/vercel/next.js/blob/canary/examples/with-polyfills/next.config.js
 *
 * Maybe we can use `static/runtime/polyfills.js` as entry?
 *
 * @param {*} polyfills
 * @param {*} entryChunkName
 */
const withPolyfill = (polyfills = [], entryChunkName = 'main.js') => {
  const getNewEntry = originalEntry => async () => {
    const originEntries = await originalEntry();
    return getNewEntries(originEntries, polyfills, entryChunkName);
  };

  return nextConfig => ({
    ...nextConfig,
    webpack(config, options) {
      // eslint-disable-next-line no-param-reassign
      config.entry = getNewEntry(config.entry);
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

export default withPolyfill;
