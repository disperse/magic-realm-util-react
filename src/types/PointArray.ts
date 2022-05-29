import type Category from "./Category";
import Categories from "./Categories";

type CategoryPoints = {
  [key: string]: number;
};

export default class PointArray {
  id: number;
  points: CategoryPoints;
  categories: Category[];
  constructor(id: number, array: number[], categories: Category[]) {
    this.id = id;
    this.points = {};
    this.points[Categories.GreatTreasures] = array[0];
    this.points[Categories.Spells] = array[1];
    this.points[Categories.Fame] = array[2];
    this.points[Categories.Notoriety] = array[3];
    this.points[Categories.Gold] = array[4];
    this.categories = categories;
  }
  public get greatTreasures(): number {
    return this.points[Categories.GreatTreasures];
  }
  public get spells(): number {
    return this.points[Categories.Spells];
  }
  public get fame(): number {
    return this.points[Categories.Fame];
  }
  public get notoriety(): number {
    return this.points[Categories.Notoriety];
  }
  public get gold(): number {
    return this.points[Categories.Gold];
  }
  public get totalScore(): number {
    return this.categories.reduce(
      (pv, cv) => pv + cv.calcFinalScore(this.points[cv.category]),
      0
    );
  }
}
