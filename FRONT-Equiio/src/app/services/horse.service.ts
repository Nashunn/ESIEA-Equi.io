import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Horse} from '../models/horse.model';
import {Response} from '../models/response.model';

@Injectable()
export class HorseService {

  constructor(private http: HttpClient) {
  }

  public addHorse(horse: Horse): Observable<Response> {
    return this.http.post<Response>(`${environment.apiUrl}/api/horses/`, horse);
  }

  public getHorses(): Observable<Horse[]> {
    return this.http.get<Horse[]>(`${environment.apiUrl}/api/horses/`);
  }

  public updateHorse(horse: Horse): Observable<Response> {
    return this.http.put<Response>(`${environment.apiUrl}/api/horses/${horse.id}`, horse);
  }

  public deleteHorse(horseId: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.apiUrl}/api/horses/${horseId}`);
  }
}
