import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson.model';

@Injectable()
export class LessonService {

  constructor(private http: HttpClient) {}

  public addLesson(lesson: Lesson): Observable<Response> {
    return this.http.post<Response>('${environment}.apiUrl/api/lessons', lesson);
  }

}
