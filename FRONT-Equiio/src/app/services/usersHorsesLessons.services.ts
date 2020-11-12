import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../models/response.model';
import { UserHorseLesson } from '../models/userHorseLesson.model';

@Injectable()
export class UsersHorsesLessonsServices {

  constructor(private http: HttpClient) {}

  public addUHLs(uhl: UserHorseLesson): Observable<Response> {
    return this.http.post<Response>(`${environment.apiUrl}/api/uhl/`, uhl);
  }

  public getUHLs(): Observable<UserHorseLesson[]> {
    return this.http.get<UserHorseLesson[]>(`${environment.apiUrl}/api/uhl/`);
  }

  public getUHLsByUser(userId: string): Observable<UserHorseLesson[]> {
    return this.http.get<UserHorseLesson[]>(`${environment.apiUrl}/api/uhl/user/${userId}`);
  }

  public getUHLsByLesson(lessonId: string): Observable<UserHorseLesson[]> {
    return this.http.get<UserHorseLesson[]>(`${environment.apiUrl}/api/uhl/lesson/${lessonId}`);
  }

  public getUHL(uhlId: string): Observable<UserHorseLesson> {
    return this.http.get<UserHorseLesson>(`${environment.apiUrl}/api/uhl/${uhlId}`);
  }

  public updateUHL(uhl: UserHorseLesson): Observable<Response> {
    return this.http.put<Response>(`${environment.apiUrl}/api/uhl/${uhl.id}`, uhl);
  }

  public deleteUHL(uhlId: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.apiUrl}/api/uhl/${uhlId}`);
  }

}
