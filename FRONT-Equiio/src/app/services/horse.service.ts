import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Horse} from '../models/horse.model';
import {Response} from '../models/response.model';

@Injectable()
export class HorseService {
  private baseURL = 'http://localhost:3080';

  constructor(private http: HttpClient) {
  }

  public addHorse(horse: Horse): Observable<Response> {
    return this.http.post<Response>(this.baseURL + '/api/horses', horse);
  }

  public getHorses(): Observable<Horse[]> {
    return this.http.get<Horse[]>(this.baseURL + '/api/horses');
  }

  public updateHorse(horse: Horse): Observable<Response> {
    return this.http.put<Response>(this.baseURL + '/api/horses/' + horse.id, horse);
  }

  public deleteHorse(horseId: string): Observable<Response> {
    return this.http.delete<Response>(this.baseURL + '/api/horses/' + horseId);
  }
}
