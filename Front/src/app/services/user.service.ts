import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class UserService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    postUser(data:any){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        const options = {
            headers: headers
        }
        return this.httpClient.post(`${this.API_URL}/users`, JSON.stringify(data), options).pipe(map(res => res))
    }
}