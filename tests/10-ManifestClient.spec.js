/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {ManifestClient} from '..';
import https from 'https';
import isNode from 'detect-node';

const httpsAgent = new https.Agent({rejectUnauthorized: false});
const baseUrl = 'https://uscis.interop.digitalbazaar.com/';

describe(`Manifest Client`, () => {
  describe(`'/manifest.json' Tests`, () => {
    if(isNode) {
      it(`successful manifest response with icons'`,
        async () => {
          const manifestClient = new ManifestClient({
            baseUrl,
            httpsAgent,
          });

          let result;
          let err;
          try {
            result = await manifestClient.getManifest();
          } catch(e) {
            err = e;
          }
          should.exist(result);
          should.not.exist(err);
          result.data.should.include.keys(['icons']);
        }
      );
    } else {
      // KARMA TEST Only
      it(`fails due to CORS error'`,
        async () => {
          const manifestClient = new ManifestClient({baseUrl});

          let result;
          let err;
          try {
            result = await manifestClient.getManifest();
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
