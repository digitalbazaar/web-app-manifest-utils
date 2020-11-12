/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {WebAppManifestClient} from '..';
import https from 'https';
import isNode from 'detect-node';
import {mockManifests} from './mock-data.js';
import nock from 'nock';

const httpsAgent = new https.Agent({rejectUnauthorized: false});
let origin = 'example.com';

describe(`Manifest Client Nock Tests`, () => {
  describe(`'/manifest.json' Tests`, () => {
    if(isNode) {
      it(`successful manifest response'`,
        async () => {
          const manifestType = 'basic';
          _nockManifest({manifestType});

          const manifestClient = new WebAppManifestClient({httpsAgent});

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
    } else {
      describe('Karma Tests', function() {
        it('fails due to CORS error',
          async () => {
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
      });
    }
  });

  describe(`'/manifest.json' Icon Tests`, () => {
    if(isNode) {
      it(`manifest response with icon'`,
        async () => {
          const manifestType = 'basic';
          _nockManifest({manifestType});

          const manifestClient = new WebAppManifestClient({httpsAgent});
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
      it(`manifest response with light icon'`,
        async () => {
          const manifestType = 'full';
          _nockManifest({manifestType});

          const manifestClient = new WebAppManifestClient({httpsAgent});
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
      it(`manifest response with dark icon'`,
        async () => {
          const manifestType = 'full';
          _nockManifest({manifestType});

          const manifestClient = new WebAppManifestClient({httpsAgent});
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
    } else {
      // KARMA TEST Only
      it(`fails due to CORS error'`,
        async () => {
          const manifestClient = new WebAppManifestClient();
          const size = 192;

          let result;
          let err;
          try {
            result = await manifestClient.getManifestWithIcon({size, origin});
          } catch(e) {
            err = e;
          }
          console.log('ERROR --------->', err);
          should.exist(err);
          should.not.exist(result);
        }
      );
    }
  });

  describe(`'/manifest.json' With Favicon Fallback Tests`, () => {
    if(isNode) {
      it(`no manifest exists with favicon'`,
        async () => {
          const manifestType = 'no-manifest';
          _nockManifest({manifestType});
          _nockFavicon({status: 200});

          const manifestClient = new WebAppManifestClient({httpsAgent});
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
      it(`manifest with no icons with favicon'`,
        async () => {
          const manifestType = 'no-icons';
          _nockManifest({manifestType});
          _nockFavicon({status: 200});

          const manifestClient = new WebAppManifestClient({httpsAgent});
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
    } else {
      // KARMA TEST Only
      it(`fails due to CORS error'`,
        async () => {
          const manifestClient = new WebAppManifestClient();
          const size = 192;

          let result;
          let err;
          try {
            result = await manifestClient.getManifestWithIcon({size, origin});
          } catch(e) {
            err = e;
          }
          console.log('ERROR --------->', err);
          should.exist(err);
          should.not.exist(result);
        }
      );
    }
  });

  describe(`'/manifest.json' With No Favicon Tests`, () => {
    if(isNode) {
      it(`no manifest exists with no favicon'`,
        async () => {
          const manifestType = 'no-manifest';
          _nockManifest({manifestType});
          _nockFavicon({status: 404});

          const manifestClient = new WebAppManifestClient({httpsAgent});
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
      it(`manifest with no icons with no favicon'`,
        async () => {
          const manifestType = 'no-icons';
          _nockManifest({manifestType});
          _nockFavicon({status: 404});

          const manifestClient = new WebAppManifestClient({httpsAgent});
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
    } else {
      // KARMA TEST Only
      it(`fails due to CORS error'`,
        async () => {
          const manifestClient = new WebAppManifestClient();
          const size = 192;

          let result;
          let err;
          try {
            result = await manifestClient.getManifestWithIcon({size, origin});
          } catch(e) {
            err = e;
          }
          console.log('ERROR --------->', err);
          should.exist(err);
          should.not.exist(result);
        }
      );
    }
  });
});

function _nockManifest({manifestType}) {
  nock(`https://${origin}`)
    .get('/manifest.json')
    // eslint-disable-next-line no-unused-vars
    .reply(uri => {
      let manifest;
      switch(manifestType) {
        case 'basic':
          manifest = mockManifests.basicManifest;
          break;
        case 'full':
          manifest = mockManifests.fullManifest;
          break;
        case 'no-icons':
          manifest = mockManifests.noIconsManifest;
          break;
        case 'no-manifest':
          return [404];
      }
      return [200, manifest];
    });
}

function _nockFavicon({status}) {
  nock(`https://${origin}`)
    .head('/favicon.ico')
    // eslint-disable-next-line no-unused-vars
    .reply(uri => {
      return [status];
    });
}
