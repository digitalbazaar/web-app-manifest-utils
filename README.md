# web-app-manifest-utils
Utilities for fetching and working with Web app manifests

## Installation

#### Set Up
```sh
npm install digitalbazaar/web-app-manifest-utils
```

## Function Calls

#### getManifest({*origin*})
- Function call that fetches a manifest from a given url and optionally uses a
proxy (via client) as a fallback if a CORS error occurs.
- *origin*: This is the base url used to fetch the manifest.

#### getManifestFromOrigin({*origin*})
- Function call that fetches a manifest from a given url.
- *origin*: This is the base url used to fetch the manifest.

#### getManifestFromProxy()
- Function call that fetches a manifest from a provided proxy url (via client).

#### getManifestWithIcon({*colorScheme, defaultIcon, origin, size*})
- Function call that fetches a manifest and icon from a given url and optionally
uses a proxy (via client) as a fallback if a CORS error occurs.
- *colorScheme*: This is the preferred color scheme for the icon (ie. 'light' or
'dark').
- *defaultIcon*: This is an optional defaultIcon to be used as a fallback if no
other icons are found.
- *origin*: This is the base url used to fetch the manifest.
- *size*: This is the preferred size for the icon.

## Example Usage

#### getManifest({*origin*})
```js
import {WebAppManifestClient} from 'web-app-manifest-utils';
import https from 'https';

const agent = new https.Agent({rejectUnauthorized: false});

// example origin & manifestProxyHost (localhost)
const origin = `https://localhost:19450`;
const manifestProxyHost = `https://localhost:19451`;

const manifestClient = new WebAppManifestClient({agent, manifestProxyHost});
const result = await manifestClient.getManifest({origin});
```

#### getManifestFromOrigin({*origin*})
```js
import {WebAppManifestClient} from 'web-app-manifest-utils';
import https from 'https';

const agent = new https.Agent({rejectUnauthorized: false});

// example origin (localhost)
const origin = `https://localhost:19451`;

const manifestClient = new WebAppManifestClient({agent});
const result = await manifestClient.getManifestFromOrigin({origin});
```

#### getManifestFromProxy()
```js
import {WebAppManifestClient} from 'web-app-manifest-utils';
import https from 'https';

const agent = new https.Agent({rejectUnauthorized: false});

// manifestProxyHost (localhost)
const manifestProxyHost = `https://localhost:19451`;

const manifestClient = new WebAppManifestClient({agent, manifestProxyHost});
const result = await manifestClient.getManifestFromProxy());
```

#### getManifestWithIcon({*colorScheme, defaultIcon, origin, size*})
```js
import {WebAppManifestClient} from 'web-app-manifest-utils';
import https from 'https';

const agent = new https.Agent({rejectUnauthorized: false});

// example origin & manifestProxyHost (localhost)
const origin = `https://localhost:19450`;
const manifestProxyHost = `https://localhost:19451`;

const colorScheme = 'light';
const defaultIcon = 'https://localhost:19451/default-icon.png'
const size = 192;

const manifestClient = new WebAppManifestClient({agent, manifestProxyHost});
const result = await manifestClient.getManifestWithIcon({
  colorScheme, defaultIcon, origin, size
});
```

## Test Suite
```sh
# mocha tests
npm run test

# karma tests
npm run test-karma
```
