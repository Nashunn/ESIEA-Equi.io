import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Response} from '../models/response.model';
import {Session} from '../models/session.model';
import {User} from '../models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
  private currentSession: Session;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentSession = this.authenticationService.currentSessionValue;
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/users/${this.currentSession.getUserId()}`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users/`);
  }

  public addUser(firstname: string, lastname: string, mail: string, phone: string, licence: string,
                 password: string, role?: string): Observable<Response> {
    return this.http.post<Response>(`${environment.apiUrl}/api/users/`, {
      firstname,
      lastname,
      mail,
      phone,
      licence,
      password,
      role,
    });
  }

  public updateUser(user: User): Observable<Response> {
    return this.http.put<Response>(`${environment.apiUrl}/api/users/${user.id}`, user);
  }

  public deleteUser(userId: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.apiUrl}/api/users/${userId}`);
  }
}
