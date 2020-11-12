export class Lesson {
  public id: string;
  public name: string;
  public date: any;
  public level: string;
  public numRiders: number;
  public numSubs: number;
  public teacherId: any;

  constructor(name: string, date: any, level: string, numRiders: number, numSubs: number, teacherId: any) {
    this.name = name;
    this.date = date;
    this.level = level;
    this.numRiders = numRiders;
    this.numSubs = numSubs;
    this.teacherId = teacherId;
  }
}
