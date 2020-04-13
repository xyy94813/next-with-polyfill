const path = require('path');

const pkg = require('./package.json');

const deps = [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})];

const external = id => deps.includes(id) || /@babel\/runtime\//.test(id);

const getBasicConf = () => ({
  input: path.join(__dirname, 'src', 'index.js'),
  external,
});

const getCJSConf = () => ({
  ...getBasicConf(),
  output: { file: pkg.main, format: 'cjs' },
  plugins: [],
});

const getEJSConf = () => ({
  ...getBasicConf(),
  output: { file: pkg.module, format: 'es' },
  plugins: [],
});

module.exports = [getCJSConf(), getEJSConf()];
