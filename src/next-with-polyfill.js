const withPolyfill = (polyfills = []) => (nextConfig = {}) => ({
  ...nextConfig,
  webpack(config, options) {
    const originalEntry = config.entry;
    /* eslint no-param-reassign: "off" */
    config.entry = async () => {
      const entries = await originalEntry();
      if (Array.isArray(entries['main.js'])) {
        const reversedPolyfills = [].concat(polyfills).reverse();
        reversedPolyfills.forEach(item => {
          if (!entries['main.js'].includes(item)) {
            entries['main.js'].unshift(item);
          }
        });
      }

      return entries;
    };

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});

export default withPolyfill;
