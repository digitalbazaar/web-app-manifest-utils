/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {ManifestClient} from '..';
import https from 'https';

const httpsAgent = new https.Agent({rejectUnauthorized: false});

describe(`Manifest Client`, () => {
  describe(`'/manifest.json' Tests`, () => {
    it(`success response'`,
      async () => {
        const baseUrl = 'http://wallet.interop.digitalbazaar.com/';
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
        console.log(err);
        console.log(result);
      }
    );
  });
});
