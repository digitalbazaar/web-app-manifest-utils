/*!
 * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
 */
export function getWebAppManifestIcon({colorScheme, manifest, origin, size}) {
  let best = null;
  // find largest square icon that is at least 48px wide
  if(manifest && manifest.icons) {
    for(const icon of manifest.icons) {
      try {
        const {color_scheme, sizes, src} = icon;
        if(colorScheme && color_scheme && color_scheme !== colorScheme) {
          continue;
        }
        if(typeof sizes === 'string' && typeof src === 'string') {
          let [x, y] = sizes.split('x');
          x = parseInt(x, 10);
          y = parseInt(y, 10);
          if(x !== y) {
            // skip non-square icons
            // TODO: allow rectangular icons in some cases?
            continue;
          }
          if(x === size && y === size) {
            // ideal match found
            best = {x, y, src};
            // adds color_scheme to 'best' if it exists.
            if(color_scheme) {
              best.color_scheme = color_scheme;
            }
            break;
          }
          const delta = Math.abs(size - x);
          // current icon is best if:
          // 1. no icon chosen yet, OR
          // 2. best icon is smaller than `size` and current is not, OR
          // 3. current icon is closer to `size` than best icon so far
          if(!best || (best.x < 48 && x >= 48) || delta < best.delta) {
            best = {x, y, src, delta};
            // adds color_scheme to 'best' if it exists.
            if(color_scheme) {
              best.color_scheme = color_scheme;
            }
          }
        }
      } catch(e) {}
    }
  }
  if(best && origin) {
    // convert relative `src` URL to absolute
    if(!best.src.startsWith('http')) {
      let src = origin;
      if(!best.src.startsWith('/')) {
        src += '/';
      }
      best.src = src + best.src;
    }
  }
  return best;
}
