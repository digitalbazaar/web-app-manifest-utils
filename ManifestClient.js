/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {httpClient} from '@digitalbazaar/http-client';

const DEFAULT_HEADERS = {Accept: 'application/manifest+json, application/json'};

export class ManifestClient {
  constructor({
    defaultHeaders,
    host,
    httpsAgent,
    manifestProxyHost,
    manifestProxyPath = '/manifest',
    manifestProxy = false
  } = {}) {
    this.defaultHeaders = {...DEFAULT_HEADERS, ...defaultHeaders};
    this.host = host;
    this.httpsAgent = httpsAgent;
    this.manifestProxyHost = manifestProxyHost;
    this.manifestProxyPath = manifestProxyPath;
    this.manifestProxy = manifestProxy;
  }

  async getManifest() {
    const {
      host, defaultHeaders: headers, httpsAgent, manifestProxyHost,
      manifestProxyPath, manifestProxy
    } = this;
    const url = `https://${host}/manifest.json`;
    let result;
    try {
      result = await httpClient.get(url, {headers, httpsAgent});
    } catch(err) {
      if(!(manifestProxy && err.message.includes('CORS'))) {
        throw err;
      }
    }
    if(result) {
      return result.data;
    }
    // proxy the request
    // TODO: use different httpsAgent?
    const proxyUrl = manifestProxyHost ?
      `https://${manifestProxyHost}${manifestProxyPath}` : manifestProxyPath;
    result = await httpClient.get(proxyUrl, {
      headers, httpsAgent, searchParams: {host}
    });
    return result.data;
  }
}
