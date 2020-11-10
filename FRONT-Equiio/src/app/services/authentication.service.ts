import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Response} from '../models/response.model';
import {Session} from '../models/session.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentSessionSubject: BehaviorSubject<Session>;
  public currentSession: Observable<Session>;

  constructor(private router: Router, private http: HttpClient) {
    const currentSession = JSON.parse(localStorage.getItem('currentSession'));
    if (currentSession) {
      this.currentSessionSubject = new BehaviorSubject<Session>(new Session(currentSession.token));
    } else {
      this.currentSessionSubject = new BehaviorSubject<Session>(null);
    }
    this.currentSession = this.currentSessionSubject.asObservable();
  }

  // Getter for current user value
  public get currentSessionValue(): Session {
    return this.currentSessionSubject.value;
  }

  // Login
  public login(
    mail: string,
    password: string,
  ): Observable<Response> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { mail, password })
      .pipe(map((res) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (res.token) {
          localStorage.setItem('currentSession', JSON.stringify(res));
          this.currentSessionSubject.next(new Session(res.token));
        }
        return res;
      }));
  }

  // Register
  public register(
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    licence: string,
    password: string,
  ): Observable<Response> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/register`, {
      firstname,
      lastname,
      mail,
      phone,
      licence,
      password,
    })
      .pipe(map((res) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentSession', JSON.stringify(res));
        this.currentSessionSubject.next(new Session(res.token));
        return res;
      }));
  }

  public updatePassword(userId, oldPassword, newPassword): Observable<Response> {
    return this.http.post<Response>(`${environment.apiUrl}/api/auth/change_password`, {userId, oldPassword, newPassword});
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentSession');
    this.currentSessionSubject.next(null);
    this.router.navigate(['/home']);
  }
}
