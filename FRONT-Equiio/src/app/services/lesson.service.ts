import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Lesson } from '../models/lesson.model';
import {Response} from '../models/response.model';

@Injectable()
export class LessonService {

  constructor(private http: HttpClient) {}

  public addLesson(lesson: Lesson): Observable<Response> {
    return this.http.post<Response>(`${environment.apiUrl}/api/lessons/`, lesson);
  }

  public getLesson(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${environment.apiUrl}/api/lessons/`);
  }

  public updateLesson(lesson: Lesson): Observable<Response> {
    return this.http.put<Response>(`${environment.apiUrl}/api/lessons/${lesson.id}`, lesson);
  }

  public deleteLesson(lessonId: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.apiUrl}/api/lessons/${lessonId}`);
  }

}
