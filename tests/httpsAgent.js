/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import https from 'node:https';
export const agent = new https.Agent({rejectUnauthorized: false});
