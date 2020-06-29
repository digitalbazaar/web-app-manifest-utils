/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {WebAppManifestClient} from '..';
import https from 'https';
import isNode from 'detect-node';

const httpsAgent = new https.Agent({rejectUnauthorized: false});
let origin = 'frontendmasters.com';

describe(`Manifest Client`, () => {
  describe(`'/manifest.json' Tests`, () => {
    if(isNode) {
      it(`successful manifest response'`,
        async () => {
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
      // KARMA TEST Only
      it(`fails due to CORS error'`,
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
    }
  });

  describe(`'/manifest.json' With Icon Tests`, () => {
    if(isNode) {
      it(`successful manifest response with icons'`,
        async () => {
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
      it(`successful manifest response with favicon'`,
        async () => {
          const manifestClient = new WebAppManifestClient({httpsAgent});
          origin = 'w3.org';
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
          should.equal(result.manifest, null);
          result.icon.should.be.an('object');
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
