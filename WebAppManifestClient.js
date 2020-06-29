/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {httpClient} from '@digitalbazaar/http-client';
import {getWebAppManifestIcon} from './manifest.js';

const DEFAULT_HEADERS = {Accept: 'application/manifest+json, application/json'};

export class WebAppManifestClient {
  constructor({
    defaultHeaders,
    httpsAgent,
    manifestProxyHost,
    manifestProxyPath = '/manifest',
    manifestProxy = false
  } = {}) {
    this.defaultHeaders = {...DEFAULT_HEADERS, ...defaultHeaders};
    this.httpsAgent = httpsAgent;
    this.manifestProxyHost = manifestProxyHost;
    this.manifestProxyPath = manifestProxyPath;
    this.manifestProxy = manifestProxy;
  }

  async getManifest({origin}) {
    const {
      host, defaultHeaders: headers, httpsAgent, manifestProxyHost,
      manifestProxyPath, manifestProxy
    } = this;
    const url = `https://${origin}/manifest.json`;
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

  async getManifestWithIcon({origin, size}) {
    const {defaultHeaders: headers, httpsAgent} = this;
    let manifest = null;
    let icon = {};
    try {
      manifest = await this.getManifest({origin});
    } catch(err) {
      const favicon = await getFavicon({origin, headers, httpsAgent});
      if(favicon) {
        icon.src = favicon;
        return {manifest, icon};
      }
    }
    icon = await getWebAppManifestIcon({manifest, origin, size});
    return {manifest, icon};
  }
}

async function getFavicon({origin, headers, httpsAgent}) {
  const url = `https://${origin}/favicon.ico`;
  const result = await httpClient.head(url, {headers, httpsAgent});
  if(result.status === 200) {
    return url;
  }
  return null;
}
