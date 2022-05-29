export class Category {
    readonly name: string;
    readonly multiplier: number;
    readonly hasRecorded: boolean;
    readonly hasOwned: boolean;
    recorded: number;
    owned: number;
    points: number;
  
    constructor(
        name: string,
        multiplier: number,
        hasOwned?: boolean,
        hasRecorded?: boolean
    ) {
        this.name = name;
        this.multiplier = multiplier;
        this.hasRecorded = hasRecorded ?? true;
        this.hasOwned = hasOwned ?? false;
        this.recorded = 0;
        this.owned = 0;
        this.points = 0;
    }
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
    calcNeeded,
    calcScore,
    calcBasicScore,
    calcBonusScore,
    calcFinalScore
}
