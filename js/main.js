import { notActiveState } from './state.js';
import { getMap } from './map.js';
import { setFiltering } from './ad-form.js';
import { getSimilarAds } from './similar-ad.js';

notActiveState();
setFiltering();
const similarAdds = getSimilarAds();
getMap();

export { similarAdds };
