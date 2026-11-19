/*!
 * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {agent} from './httpsAgent.js';
import isNode from 'detect-node';
import {mockManifests} from './mock-data.js';
import {WebAppManifestClient} from '../lib/index.js';

const baseUrl = 'https://localhost:19451';

describe('Manifest Client Server Tests', () => {
  describe(`'/manifest.json' Tests`, () => {
    it('successful manifest response', async () => {
      const manifestType = 'basic';
      const origin = `${baseUrl}/${manifestType}`;

      const manifestClient = new WebAppManifestClient({agent});

      let result;
      let err;
      try {
        result = await manifestClient.getManifest({origin});
      } catch(e) {
        err = e;
      }
      should.exist(result);
      should.not.exist(err);
      result.should.include.keys(['icons']);
    });
  });

  if(!isNode) {
    describe(`'/manifest.json' CORS Tests`, () => {
      it('fails due to CORS error',
        async () => {
          const origin = 'https://localhost:19450';

          const manifestClient = new WebAppManifestClient();

          let result;
          let err;
          try {
            result = await manifestClient.getManifest({origin});
          } catch(e) {
            err = e;
          }
          should.exist(err);
          should.not.exist(result);
        }
      );
      it('successful manifest response via proxy',
        async () => {
          const origin = 'https://localhost:19450';
          const manifestProxyHost = `${baseUrl}/proxy`;

          const manifestClient = new WebAppManifestClient({
            agent, manifestProxyHost
          });

          let result;
          let err;
          try {
            result = await manifestClient.getManifest({origin});
          } catch(e) {
            err = e;
          }
          should.exist(result);
          should.not.exist(err);
          result.should.include.keys(['icons']);
        }
      );
    });
  }

  describe(`'/manifest.json' Icon Tests`, () => {
    it('manifest response with icon',
      async () => {
        const manifestType = 'basic';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;

        let result;
        let err;
        try {
          result = await manifestClient.getManifestWithIcon({size, origin});
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['manifest', 'icon']);
        result.manifest.should.be.an('object');
        result.icon.should.be.an('object');
      }
    );
    it('manifest response with light icon',
      async () => {
        const manifestType = 'full';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;
        const colorScheme = 'light';

        let result;
        let err;
        try {
          result = await manifestClient.getManifestWithIcon({
            colorScheme, size, origin
          });
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['manifest', 'icon']);
        result.manifest.should.be.an('object');
        result.icon.should.be.an('object');
        result.icon.color_scheme.should.equal('light');
      }
    );
    it('manifest response with dark icon',
      async () => {
        const manifestType = 'full';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;
        const colorScheme = 'dark';

        let result;
        let err;
        try {
          result = await manifestClient.getManifestWithIcon({
            colorScheme, size, origin
          });
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['manifest', 'icon']);
        result.manifest.should.be.an('object');
        result.icon.should.be.an('object');
        result.icon.color_scheme.should.equal('dark');
      }
    );
    it('successfully gets only icon',
      async () => {
        const manifest = mockManifests.basicManifest;
        const manifestType = 'basic';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;

        let result;
        let err;
        try {
          result = await manifestClient.getManifestIcon({
            size, manifest, origin
          });
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['src']);
      }
    );
    it('successfully gets only light icon',
      async () => {
        const manifest = mockManifests.fullManifest;
        const manifestType = 'full';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;
        const colorScheme = 'light';

        let result;
        let err;
        try {
          result = await manifestClient.getManifestIcon({
            colorScheme, size, manifest, origin
          });
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['src']);
        result.color_scheme.should.equal('light');
      }
    );
    it('successfully gets only dark icon',
      async () => {
        const manifest = mockManifests.fullManifest;
        const manifestType = 'full';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;
        const colorScheme = 'dark';

        let result;
        let err;
        try {
          result = await manifestClient.getManifestIcon({
            colorScheme, size, manifest, origin
          });
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['src']);
        result.color_scheme.should.equal('dark');
      }
    );
  });

  describe(`'/manifest.json' Icon Sizes Tests`, () => {
    const origin = `${baseUrl}/basic`;
    const manifestClient = new WebAppManifestClient({agent});

    it('chooses a `sizes: "any"` icon for any requested size', async () => {
      const manifest = mockManifests.anySizeManifest;
      for(const size of [16, 192, 512]) {
        const result = await manifestClient.getManifestIcon({
          size, manifest, origin
        });
        result.src.should.equal(`${origin}/mock-image.svg`);
      }
    });
    it('chooses an icon from a `sizes` list', async () => {
      const manifest = mockManifests.sizeListManifest;
      const result = await manifestClient.getManifestIcon({
        size: 48, manifest, origin
      });
      result.src.should.equal(`${origin}/mock-image-48x48.png`);
    });
    it('prefers an exact size match over `sizes: "any"`', async () => {
      const manifest = mockManifests.anyAndExactManifest;
      const result = await manifestClient.getManifestIcon({
        size: 192, manifest, origin
      });
      result.src.should.equal(`${origin}/mock-image-192x192.png`);
    });
    it('prefers `sizes: "any"` over an inexact size match', async () => {
      const manifest = mockManifests.anyAndExactManifest;
      const result = await manifestClient.getManifestIcon({
        size: 64, manifest, origin
      });
      result.src.should.equal(`${origin}/mock-image.svg`);
    });
  });

  describe(`'/manifest.json' With Favicon Fallback Tests`, () => {
    it('no manifest exists with favicon',
      async () => {
        const manifestType = 'no-manifest';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;

        let result;
        let err;
        try {
          result = await manifestClient.getManifestWithIcon({origin, size});
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['manifest', 'icon']);
        should.equal(result.manifest, undefined);
        result.icon.should.be.an('object');
        result.icon.src.should.include('favicon.ico');
      }
    );
    it('manifest with no icons with favicon',
      async () => {
        const manifestType = 'no-icons';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;

        let result;
        let err;
        try {
          result = await manifestClient.getManifestWithIcon({
            size, origin
          });
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['manifest', 'icon']);
        result.manifest.should.be.an('object');
        result.icon.should.be.an('object');
        result.icon.src.should.include('favicon.ico');
      }
    );
  });

  describe(`'/manifest.json' With defaultIcon Fallback Tests`, () => {
    it('no manifest exists with defaultIcon',
      async () => {
        const manifestType = 'no-manifest';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;
        const defaultIcon = 'https://example.com/defaulticon.png';

        let result;
        let err;
        try {
          result = await manifestClient.getManifestWithIcon({
            defaultIcon, origin, size
          });
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['manifest', 'icon']);
        should.equal(result.manifest, undefined);
        result.icon.src.should.include('defaulticon.png');
      }
    );
    it('manifest with no icons with defaultIcon',
      async () => {
        const manifestType = 'no-icons';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});
        const size = 192;
        const defaultIcon = 'https://example.com/defaulticon.png';

        let result;
        let err;
        try {
          result = await manifestClient.getManifestWithIcon({
            defaultIcon, size, origin
          });
        } catch(e) {
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.be.an('object');
        result.should.include.keys(['manifest', 'icon']);
        result.manifest.should.be.an('object');
        result.icon.src.should.include('defaulticon.png');
      }
    );
  });
});
