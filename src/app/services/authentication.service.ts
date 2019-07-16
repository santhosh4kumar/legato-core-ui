import { ToastrService } from 'ngx-toastr';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public user: User = null;
    public token: string = null;
    apiUrl: string = environment.config.apiUrl;

    constructor(private http: HttpClient, private _router: Router, 
        private toastrService: ToastrService) {
        this.token = sessionStorage.getItem('token');
        if (this.token) {
            this.checkSessionToken();
        }
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.apiUrl + '/auth/signin', { 'username': username, 'password': password })
        .pipe(map(response => {
            if (response && response.statusCode == 200) {
                let data = response.data;
                this.token = data.token;
                this.updateToken(this.token);
                return true;
            } else {
                return false;
            }
        }, error => {
            return false;
        }));
    }

    decode() {
        debugger;
        var userTemp: any = JSON.parse(window.atob(this.token.split('.')[1])) || {};
        return JSON.parse(window.atob(this.token.split('.')[1])) || {};
    }

    logout() {
        if(this.token) {
            this.http.get<any>(this.apiUrl + '/auth/signout', {})
            .subscribe(
                response => {
                    debugger;
                    this.toastrService.success("User logged out.", "Success Message");
                },
                error => {
                    // this.toastrService.error(error.error.statusMessage, "Error Message");
                }
            );
        }
        sessionStorage.removeItem('token');
        this.user = null;
        this.token = null;
        this._router.navigateByUrl('login');
    }

    checkSessionToken() {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.get<any>(this.apiUrl + '/auth/token', { headers: headers })
            .subscribe(
            response => {
                let data = response.data;
                this.token = data.accessToken;
                this.updateToken(this.token);
            },
            error => {
                this.toastrService.error(error.error.statusMessage, "Error Message");
                this.logout();
            }
        );
    }

    updateToken(token) {
        if(!token) {
            this.clearToken();
        }
        this.user = this.decode();
        sessionStorage.setItem('token', this.token);
        sessionStorage.setItem('user', JSON.stringify(this.user));
    }

    getUserAccess() {

    }

    clearToken() {
        this.token = null;
        this.user = null;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
}