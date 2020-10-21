// @ts-ignore
import jwt_decode from 'jwt-decode';

export class Session {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }

  public getUserId(): string {
    const payload = jwt_decode(this.token);
    return payload.id;
  }

  public getUserRole(): string {
    const payload = jwt_decode(this.token);
    return payload.role;
  }
}
