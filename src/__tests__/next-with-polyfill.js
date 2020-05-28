/* eslint-disable no-undef */
import withPolyfill from '../index';

describe('next-with-polyfill', () => {
  const chunkName1 = 'main.js';
  const chunkName2 = 'static/runtime/polyfills.js';

  const defaultEntry = async () => ({
    [chunkName1]: [],
    [chunkName2]: 'client/polyfill.js',
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
    const entries = await webpackConf.entry();
    polyfills.forEach((item, index) => {
      expect(entries[chunkName1][index]).toBe(item);
    });
  });

  it('With Same polyfill', async () => {
    const polyfills = ['test-polyfill1'];
    excutePlugin(withPolyfill(polyfills), excutePlugin(withPolyfill(polyfills), {}));
    const entries = await webpackConf.entry();
    expect(entries[chunkName1].length).toBe(1);
  });

  it('Empty polyfill', async () => {
    excutePlugin(withPolyfill(), {});
    const entries = await webpackConf.entry();
    expect(entries[chunkName1].length).toBe(0);
  });

  it('Change entry chunk name', async () => {
    const notExistChunkName = 'not-exist-chunk-name.js';
    excutePlugin(
      withPolyfill(['test-polyfill0', 'test-polyfill1'], chunkName2),
      excutePlugin(withPolyfill(['test-polyfill2', 'test-polyfill3'], notExistChunkName), {}),
    );
    const entries = await webpackConf.entry();
    expect(entries[chunkName2].length).toBe(3);
    expect(entries[notExistChunkName].length).toBe(2);
  });
});
