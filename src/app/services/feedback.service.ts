import { Feedback } from './../model/feedback.model';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from, throwError } from 'rxjs';
import { map, filter, flatMap } from 'rxjs/operators';

@Injectable()
export class FeedbackService {
    _apiUrl: string;
    comments: Feedback[];

    constructor(private _http: HttpClient) {
        this._apiUrl = environment.apiUrl;
    }

    getFeedbacks(): Observable<Feedback[]> {
        return this._http.get<Feedback[]>(this._apiUrl + "/comments");
    }

    save(comment: Feedback) {
        this._http.post(this._apiUrl + "/comments", comment, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).subscribe(
            data => console.log(data),
            error => {
                // this._httpClientService.handleError(error);
            }
        );
    }
}