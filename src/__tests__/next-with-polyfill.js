/* eslint-disable no-undef */
import withPolyfill from '../index';

describe('next-with-polyfill', () => {
  const defaultEntry = async () => ({
    'main.js': [],
  });
  const webpackConf = {};
  const excutePlugin = (middleware, nextConf = {}) => {
    const newConf = middleware(nextConf);
    if (newConf.webpack) {
      newConf.webpack(webpackConf);
    }
    return newConf;
  };

  beforeEach(() => {
    webpackConf.entry = defaultEntry;
  });

  it('Normal function', async () => {
    const polyfills = ['test-polyfill0', 'test-polyfill1'];
    excutePlugin(withPolyfill(polyfills));
    const entrys = await webpackConf.entry();
    polyfills.forEach((item, index) => {
      expect(entrys['main.js'][index]).toBe(item);
    });
  });

  it('With Same polyfill', async () => {
    const polyfills = ['test-polyfill1'];
    excutePlugin(withPolyfill(polyfills), excutePlugin(withPolyfill(polyfills), {}));
    const entrys = await webpackConf.entry();
    expect(entrys['main.js'].length).toBe(1);
  });
  it('Empty polyfill', async () => {
    excutePlugin(withPolyfill([]), {});
    const entrys = await webpackConf.entry();
    expect(entrys['main.js'].length).toBe(0);
  });
});
