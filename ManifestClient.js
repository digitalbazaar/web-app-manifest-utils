/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {httpClient} from '@digitalbazaar/http-client';

const DEFAULT_HEADERS = {Accept: 'application/manifest+json, application/json'};

export class ManifestClient {
  constructor({
    baseUrl,
    defaultHeaders,
    endpoint = 'manifest.json',
    httpsAgent
  } = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {...DEFAULT_HEADERS, ...defaultHeaders};
    this.endpoint = endpoint;
    this.httpsAgent = httpsAgent;
  }

  async getManifest() {
    const {
      baseUrl, defaultHeaders: headers, endpoint, httpsAgent
    } = this;
    const url = `${baseUrl}${endpoint}`;
    return httpClient.get(url, {headers, httpsAgent});
  }
}
