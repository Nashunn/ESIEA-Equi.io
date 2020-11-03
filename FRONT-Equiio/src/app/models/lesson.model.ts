export class Lesson {
  public id: string;
  public name: string;
  public date: any;
  public numRiders: number;
  public level: string;
  public teacherId: any;

  constructor(name: string, date: any, numRiders: number, level: string, teacherId: any) {
    this.name = name;
    this.date = date;
    this.numRiders = numRiders;
    this.level = level;
    this.teacherId = teacherId;
  }
}
