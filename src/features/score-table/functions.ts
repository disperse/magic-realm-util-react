import { Patch } from './types';
import { Category } from '../../types/Category';

function getRandomPatches(categories: Array<Category>): Array<Patch> {
  const patches: Array<Patch> = [];
  let remaining = 5;
  categories
    .forEach((category, index) => {
      const patch: Patch = { points: 0, owned: 0, recorded: 0 };
      const points = (index === categories.length - 1)
        ? remaining
        : Math.floor(Math.random() * (remaining + 1));
      patch.points = points;
      remaining -= points;
      patch.owned = Math.random() * 8 - 2;
      patch.recorded = Math.random() * 8 - 2;
      patches.push(patch);
    });
  patches.sort(() => ((Math.random() < 0.5) ? 1 : -1));
  return patches;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getRandomPatches,
};
