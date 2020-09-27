export class Alert {
  public id: string;
  public status: string;
  public message: string;
  public autoClose: boolean;
  public keepAfterRouteChange: boolean;
  public fade: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}
