export class Lesson {
  public name: string;
  public date: any;
  public numRiders: number;
  public level: string;

  constructor(name: string, date: any, numRiders: number, level: string) {
    this.name = name;
    this.date = date;
    this.numRiders = numRiders;
    this.level = level;
  }
}
