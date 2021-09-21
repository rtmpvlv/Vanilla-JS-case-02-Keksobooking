import {
  getSimilarAd
} from './sim-ads.js';

const SIMILAR_ADS_COUNT = 10;

const similarAds = new Array(SIMILAR_ADS_COUNT).fill(null).map(() => getSimilarAd());
console.log(similarAds);
