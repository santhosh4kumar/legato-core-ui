import { Config } from './../model/config.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
    config: Config = null;
    constructor(private http: HttpClient) {

    }

    get(key: string) {
        return null;
    }
}