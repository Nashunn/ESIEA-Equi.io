export class UserHorseLesson {
  public id: string;
  public userId: any;
  public horseId: any;
  public lessonId: any;

  constructor(userId: any, horseId: any, lessonId: any) {
    this.userId = userId;
    this.horseId = horseId;
    this.lessonId = lessonId;
  }
}
