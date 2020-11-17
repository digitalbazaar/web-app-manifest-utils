/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {WebAppManifestClient} from '..';
import https from 'https';
import isNode from 'detect-node';

const agent = new https.Agent({rejectUnauthorized: false});
const baseUrl = 'localhost:19451';

describe('Manifest Client Nock Tests', () => {
  describe(`'/manifest.json' Tests`, () => {
    if(!isNode) {
      it('fails due to CORS error',
        async () => {
          const origin = 'localhost:19450';

          const manifestClient = new WebAppManifestClient();

          let result;
          let err;
          try {
            result = await manifestClient.getManifest({origin});
          } catch(e) {
            err = e;
          }
          console.log('ERROR --------->', err);
          should.exist(err);
          should.not.exist(result);
        }
      );
    }
    it('successful manifest response',
      async () => {
        const manifestType = 'basic';
        const origin = `${baseUrl}/${manifestType}`;

        const manifestClient = new WebAppManifestClient({agent});

        let result;
        let err;
        try {
          result = await manifestClient.getManifest({origin});
        } catch(e) {
          console.log(e);
          err = e;
        }
        should.exist(result);
        should.not.exist(err);
        result.should.include.keys(['icons']);
      }
    );
  });

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

  describe(`'/manifest.json' With No Favicon Tests`, () => {
    it('no manifest exists with no favicon',
      async () => {
        const manifestType = 'no-manifest';
        const origin = `${baseUrl}/${manifestType}/no-favicon`;

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
        should.equal(result.icon, undefined);
      }
    );
    it('manifest with no icons with no favicon',
      async () => {
        const manifestType = 'no-icons';
        const origin = `${baseUrl}/${manifestType}/no-favicon`;

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
        should.equal(result.icon, undefined);
      }
    );
  });
});
