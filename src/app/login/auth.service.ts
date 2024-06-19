import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private authURL = 'dummy-url';

    constructor(private http: HttpClient){}

    login(credentials:any): Observable<any>{
        return this.http.post(`${this.authURL}/login`, credentials);
    }

    register(data:any): Observable<any>{
        return this.http.post(`${this.authURL}/register`, data);
    }
}