import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable()
export class UserService {
    private baseURL = 'http://localhost:3080';

    constructor(private http: HttpClient) { }

    public getUser(): Observable<User> {
        return this.http.get<User>(this.baseURL + '/api/users/5f645cf0f15f6372c02c787f');
    }

    public updateUser(user: User): Observable<User> {
        return this.http.put<User>(this.baseURL + '/api/users/5f645cf0f15f6372c02c787f', user);
    }
}
