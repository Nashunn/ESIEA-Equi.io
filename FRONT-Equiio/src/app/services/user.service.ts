import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Response} from '../models/response.model';
import {Session} from '../models/session.model';
import {User} from '../models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
  private baseURL = 'http://localhost:3080';
  private currentSession: Session;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentSession = this.authenticationService.currentSessionValue;
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(this.baseURL + '/api/users/' + this.currentSession.getUserId());
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + '/api/users');
  }

  public updateUser(user: User): Observable<Response> {
    return this.http.put<Response>(this.baseURL + '/api/users/' + user.id, user);
  }

  public deleteUser(userId: string): Observable<Response> {
    return this.http.delete<Response>(this.baseURL + '/api/users/' + userId);
  }
}
