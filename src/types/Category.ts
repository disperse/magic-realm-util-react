export interface Category {
  readonly name: string;
  readonly multiplier: number;
  readonly hasRecorded: boolean;
  readonly hasOwned: boolean;
  recorded: number;
  owned: number;
  points: number;
}

function createCategory(
  name: string,
  multiplier: number,
  hasRecorded?: boolean,
  hasOwned?: boolean,
): Category {
  return {
    name,
    multiplier,
    hasRecorded: (hasRecorded ?? true),
    hasOwned: (hasOwned ?? false),
    recorded: 0,
    owned: 0,
    points: 0,
  };
}
function calcNeeded(points: number, cat: Category) {
  return points * cat.multiplier;
}
function calcScore(points: number, cat: Category) {
  const score = cat.recorded + cat.owned - calcNeeded(points, cat);
  return score < 0 ? score * 3 : score;
}
function calcBasicScore(points: number, cat: Category) {
  return Math.floor(calcScore(points, cat) / cat.multiplier);
}
function calcBonusScore(points: number, cat: Category) {
  return calcBasicScore(points, cat) * points;
}
function calcFinalScore(points: number, cat: Category) {
  return calcBasicScore(points, cat) + calcBonusScore(points, cat);
}

export {
  createCategory,
  calcNeeded,
  calcScore,
  calcBasicScore,
  calcBonusScore,
  calcFinalScore,
};
