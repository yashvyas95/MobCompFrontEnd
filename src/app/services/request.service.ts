import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient : HttpClient) { }

  getRequest(id: number): Observable<any>{
    const params = new HttpParams().append('id',id.toString());
    return this.httpClient.get('http://localhost:8080/api/request/getById/',{params:params});
  }

  completeRequest(id:string): Observable<any>{
    const params = new HttpParams().append('id',id);
    return this.httpClient.get('http://localhost:8080/api/request/Completerequest/',{params:params});
  }
  
}
