import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './../model/config.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
    apiUrl: string = environment.config.apiUrl;
    public config: any;

    constructor(private http: HttpClient, 
        private toastrService: ToastrService) {
        this.read();
    }

    read() {
        this.http.get<any>(this.apiUrl + '/property/')
        .subscribe(response => {
            this.config = response.data;
        }, error => {
          if(error.status === 0) {
            this.toastrService.error('Application server may not be running!', 'Error Message');
          } else {
            this.toastrService.error('Failed to load manager list!', 'Error Message');
          }
        });
    }


}