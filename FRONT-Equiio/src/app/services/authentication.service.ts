import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Getter for current user value
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // Login
  public login(
    email: string,
    password: string,
  ): Observable<Response> {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
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
    type: string,
  ): Observable<Response> {
    console.log('auth service : ' + firstname + ' ' + lastname);
    return this.http.post<any>(`${environment.apiUrl}/users`, {
      firstname,
      lastname,
      mail,
      phone,
      licence,
      password,
      type,
    })
      .pipe(map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
