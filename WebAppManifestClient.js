/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {httpClient} from '@digitalbazaar/http-client';
import {getWebAppManifestIcon} from './manifest.js';

const DEFAULT_HEADERS = {Accept: 'application/manifest+json, application/json'};

export class WebAppManifestClient {
  constructor({
    defaultHeaders,
    agent,
    manifestProxyHost,
    manifestProxyPath = '/manifest.json'
  } = {}) {
    this.defaultHeaders = {...DEFAULT_HEADERS, ...defaultHeaders};
    this.agent = agent;
    this.manifestProxyHost = manifestProxyHost;
    this.manifestProxyPath = manifestProxyPath;
  }

  async getManifest({origin}) {
    const {manifestProxyHost} = this;
    let result;
    try {
      result = await this.getManifestFromOrigin({origin});
    } catch(err) {
      if(err.status === 404) {
        throw err;
      }
      // proxy the request
      if(manifestProxyHost) {
        result = await this.getManifestFromProxy();
        return result.data;
      }
      throw err;
    }
    return result.data;
  }

  async getManifestFromOrigin({origin}) {
    const {defaultHeaders: headers, agent} = this;
    const url = `https://${origin}/manifest.json`;
    let result;
    try {
      result = await httpClient.get(url, {headers, agent});
    } catch(err) {
      throw err;
    }
    return result;
  }

  async getManifestFromProxy() {
    const {
      host, defaultHeaders: headers, agent, manifestProxyHost,
      manifestProxyPath
    } = this;
    const proxyUrl = manifestProxyHost ?
      `https://${manifestProxyHost}${manifestProxyPath}` : manifestProxyPath;
    let result;
    try {
      result = await httpClient.get(proxyUrl, {
        headers, agent, searchParams: {host}
      });
    } catch(err) {
      throw err;
    }
    return result;
  }

  async getManifestWithIcon({
    colorScheme = 'light', defaultIcon, origin, size
  }) {
    const {defaultHeaders: headers, agent} = this;
    let manifest;
    let icon = {};
    try {
      manifest = await this.getManifest({origin});
    } catch(err) {
      const favicon = await getFavicon({headers, agent, origin});
      favicon ? icon.src = favicon : icon.src = defaultIcon;
      if(!icon.src) {
        icon = undefined;
      }
      return {manifest, icon};
    }
    icon = await getWebAppManifestIcon({colorScheme, manifest, origin, size});
    if(!icon) {
      icon = {};
      const favicon = await getFavicon({headers, agent, origin});
      favicon ? icon.src = favicon : icon.src = defaultIcon;
    }
    if(!icon.src) {
      icon = undefined;
    }
    return {manifest, icon};
  }
}

async function getFavicon({origin, headers, agent}) {
  const url = `https://${origin}/favicon.ico`;
  try {
    await httpClient.head(url, {headers, agent});
  } catch(err) {
    return null;
  }
  return url;
}
