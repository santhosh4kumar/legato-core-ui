import { environment } from './../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Admin } from './../model/admin.model';
import { User } from './../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class UserService {
    apiUrl: string = environment.config.apiUrl;
    admins: Admin[] = [];
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.apiUrl + '/user/admins');
    }

    getAdmins() {
        return this.http.get<any>(this.apiUrl + '/user/admins');
    }

    addUser(user: User, file: File) {
        const headers = new HttpHeaders();
        const rawData = new FormData();
        rawData.append('data', JSON.stringify(user));
        rawData.append('file', file);
        headers.append('ContentType', null);
        return this.http.post<any>(this.apiUrl + '/user/signup', rawData, { headers: headers });
    }
}