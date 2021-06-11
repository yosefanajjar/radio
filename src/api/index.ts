import { stations } from '../data';
import { Station } from '../types';

export const getStations = (): Promise<Station[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(stations);
    }, 3000);
  });
